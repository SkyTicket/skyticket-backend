const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DateTimeUtils = require('../../libs/datetime');
const Moment = require('../../libs/moment');
const Currency = require('../../libs/currency');

const ErrorHandler = require('./error_handler.utils');
const AirportTimezone = require('./airport_timezone.flights')
const FlightDataFilters = require('./filters.flights');
const FlightSeatChecker = require('./flight_seat_checker.flights');
const flightSeatChecker = require('./flight_seat_checker.flights');

class FlightsController {
    static async searchFlights(req, res, next){
        const {
            departure_airport,
            arrival_airport,
            flight_departure_date,
            returning_flight_departure_date,
            is_round_trip,
            total_adult_passengers,
            total_child_passengers,
            total_infant_passengers,
            seat_class_type,
            sort_by,
        } = req.query
        
        const returningDepartureAirport = arrival_airport;
        const returningArrivalAirport = departure_airport;

        let {
            page,
            limit
        } = req.query
        
        page = parseInt(page) || 1;  
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        try {
            const adultPassengersTotal = Number(total_adult_passengers)
            const childPassengersTotal = Number(total_child_passengers)
            const infantPassengersTotal = Number(total_infant_passengers)

            const passengersTotal = adultPassengersTotal + childPassengersTotal + infantPassengersTotal

            const airportTimezone = await AirportTimezone(departure_airport, arrival_airport, flight_departure_date, returning_flight_departure_date)

            const flightsWhereClause = {
                OR: [
                    {
                        AND: [
                            {
                                departure_airport: {
                                    airport_code: departure_airport
                                }
                            },
                            {
                                arrival_airport: {
                                    airport_code: arrival_airport
                                }
                            },
                            {
                                flight_departure_date: {
                                    gte: airportTimezone.pickedDepartureDate.toISOString(),
                                    lt: DateTimeUtils.modifyHours(airportTimezone.pickedDepartureDate, 24).toISOString()
                                },
                            },
                            {
                                flight_seat_classes: {
                                    some: {
                                        seat_class: {
                                            seat_class_type: seat_class_type
                                        }
                                    }
                                }
                            }
                        ],
                    },
                    {
                        AND: [
                            {
                                departure_airport: {
                                    airport_code: returningDepartureAirport // flip between departure_aiport and arrival_airport
                                }
                            },
                            {
                                arrival_airport: {
                                    airport_code: returningArrivalAirport // flip between departure_aiport and arrival_airport
                                }
                            },
                            {
                                flight_departure_date: {
                                    gte: airportTimezone.pickedReturningDepartureDate.toISOString(),
                                    lt: DateTimeUtils.modifyHours(airportTimezone.pickedReturningDepartureDate, 24).toISOString()
                                }
                            },
                            {
                                flight_seat_classes: {
                                    some: {
                                        seat_class: {
                                            seat_class_type: seat_class_type
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ],
            }

            const flights = await prisma.flights.findMany({
                skip: skip,
                take: limit,
                where: flightsWhereClause,
                select: {
                    airline: {
                        select: {
                            Airline_logo: true,
                            airline_name: true,
                            airline_code: true
                        }
                    },
                    departure_airport: {
                        select: {
                            airport_code: true,
                            airport_time_zone: true,
                            airport_name: true
                        }
                    },
                    arrival_airport: {
                        select: {
                            airport_code: true,
                            airport_time_zone: true,
                            airport_name: true
                        }
                    },
                    flight_seat_classes: {
                        select: {
                            seat_class_price: true,
                            seat_class: true,
                            seat_class_capacity: true
                        },
                    },
                    flight_id: true,
                    flight_number: true,
                    flight_departure_date: true,
                    flight_arrival_date: true
                }
            })

            let flightsTotal = await prisma.flights.count({
                where: flightsWhereClause
            })

            const mappedFlights = flights.map((flight) => {
                const findBySeatClassType = flight.flight_seat_classes.find(flightSeatClass => {
                    return flightSeatClass.seat_class.seat_class_type === seat_class_type
                })
                
                return {
                    flight_id: flight.flight_id, // for count tickets handling
                    flight_seat_class_capacity: findBySeatClassType.seat_class_capacity, // for count tickets handling
                    airline_logo: flight.airline.Airline_logo,
                    airline_name_and_class: `${flight.airline.airline_name} - ${findBySeatClassType.seat_class.seat_class_type}`,
                    seat_class_price: {
                        raw: Number(findBySeatClassType.seat_class_price),
                        formatted: Currency.format(findBySeatClassType.seat_class_price),
                    },
                    departure_airport: flight.departure_airport.airport_code,
                    departure_time: DateTimeUtils.formatHoursByTimezone(flight.flight_departure_date, flight.departure_airport.airport_time_zone),
                    flight_duration: {
                        raw: Moment.timeDifferenceInMin(flight.flight_arrival_date, flight.flight_departure_date),
                        formatted: Moment.timeDifferenceFormatted(flight.flight_arrival_date, flight.flight_departure_date),
                    }, 
                    arrival_airport: flight.arrival_airport.airport_code,
                    arrival_time: DateTimeUtils.formatHoursByTimezone(flight.flight_arrival_date, flight.arrival_airport.airport_time_zone),
                    flight_details: {
                        departure_time: DateTimeUtils.formatHoursByTimezone(flight.flight_departure_date, flight.departure_airport.airport_time_zone),
                        departure_date: DateTimeUtils.formatDateByTimezone(flight.flight_departure_date, flight.departure_airport.airport_time_zone),
                        departure_airport_name: flight.departure_airport.airport_name,
                        airline_name_and_class: `${flight.airline.airline_name} - ${findBySeatClassType.seat_class.seat_class_type}`,
                        flight_number: `${flight.airline.airline_code} - ${flight.flight_number}`,
                        airline_logo: flight.airline.Airline_logo,
                        arrival_time: DateTimeUtils.formatHoursByTimezone(flight.flight_arrival_date, flight.arrival_airport.airport_time_zone),
                        arrival_date: DateTimeUtils.formatDateByTimezone(flight.flight_arrival_date, flight.arrival_airport.airport_time_zone),
                        arrival_airport_name: flight.arrival_airport.airport_name,
                        raw_departure_datetime: flight.flight_departure_date,
                        raw_arrival_datetime: flight.flight_arrival_date
                    }
                }
            })

            // sort mappedFlights by query parameter of sort_by
            FlightDataFilters.sortFlights(mappedFlights, sort_by)
            
            // filter to show departing flights by comparing departure_airport to departing departure_airport
            const departingFlights = FlightDataFilters.departingFlights(mappedFlights, departure_airport)

            // if no flights record found
            ErrorHandler.ifNoFlightsFound(departingFlights)

            // check if each flight has enough available seats for the total number of passengers (adults + children)
            let departingFlightSeatChecker = await FlightSeatChecker(departingFlights, adultPassengersTotal, childPassengersTotal);

            // check if all flights are full
            ErrorHandler.ifAllFlightsAreFull(departingFlightSeatChecker.filteredFlightsStatus, departingFlightSeatChecker.flightSeatCapacities)

            // base_url with full URL
            const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
            const params = new URLSearchParams(url.search);

            // delete 'page' and 'limit' query params
            params.delete('page');
            params.delete('limit');
            let fullUrlWithoutPageAndLimit = `${url.origin}${url.pathname}?${params.toString()}`;

            // if is_round_trip is true (yes)
            let returningFlightsUrl;
            if(is_round_trip === "true"){
                ErrorHandler.ifNoReturningDateInRoundTrip(returning_flight_departure_date)
                // flightsTotal = Math.ceil(flightsTotal / 2)
                params.delete('flight_departure_date');
                params.delete('returning_flight_departure_date');
                params.delete('departure_airport');
                params.delete('arrival_airport');
                params.delete('is_round_trip');

                const encodedReturningFlightDepartureDate = encodeURIComponent(returning_flight_departure_date);
                const encodedFlightDepartureDate = encodeURIComponent(flight_departure_date);

                returningFlightsUrl = `${url.origin}${url.pathname}?${params.toString()}&flight_departure_date=${encodedReturningFlightDepartureDate}&departure_airport=${returningDepartureAirport}&arrival_airport=${returningArrivalAirport}`;
                fullUrlWithoutPageAndLimit = `${url.origin}${url.pathname}?${params.toString()}&flight_departure_date=${encodedFlightDepartureDate}&departure_airport=${departure_airport}&arrival_airport=${arrival_airport}&is_round_trip=${is_round_trip}&returning_flight_departure_date=${encodedReturningFlightDepartureDate}`;
            }

            return res.json({
                status: 'success',
                message: 'Berhasil menemukan penerbangan',
                debug: {
                    flightSeatChecker: {
                        bookedTicketsFlightIds: departingFlightSeatChecker.bookedTicketsFlightIds,
                        bookedSeatsPerFlight: departingFlightSeatChecker.bookedSeatsPerFlight,
                        flightSeatCapacities: departingFlightSeatChecker.flightSeatCapacities,
                        filteredFlightsStatus: departingFlightSeatChecker.filteredFlightsStatus,
                        flightsTotal: flightsTotal
                    },
                },
                passengers: {
                    adult: adultPassengersTotal,
                    child: childPassengersTotal,
                    infant: infantPassengersTotal,
                    total_no_infant: passengersTotal - infantPassengersTotal,
                    total: passengersTotal,
                },
                flights: departingFlights,
                returning_flights_url: returningFlightsUrl,
                pagination: {
                    current_page: page,
                    limit: limit,
                    prev_url: page > 1 ? `${fullUrlWithoutPageAndLimit}&page=${page - 1}&limit=${limit}` : null,
                    next_url: page >= Math.ceil(Number(flightsTotal) / Number(limit)) ? null : `${fullUrlWithoutPageAndLimit}&page=${page + 1}&limit=${limit}`,
                },
            })
        } catch(err) {
            if(err.statusCode){
                return res.status(err.statusCode).json({
                    status: 'error',
                    messages: {
                        line_1: err.message.line_1,
                        line_2: err.message.line_2,
                    }
                })
            }
            next(err)
        }
    }
}

module.exports = FlightsController;
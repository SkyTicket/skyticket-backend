const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DateTimeUtils = require('../../libs/datetime');
const Moment = require('../../libs/moment');
const Currency = require('../../libs/currency');

const ErrorHandler = require('./error_handler.utils');
const AirportTimezone = require('./airport_timezone.flights')
const FlightDataFilters = require('./filters.flights');
const FlightSeatChecker = require('./flight_seat_checker.flights');
const FlightDataMapper = require('./mapper.flights');

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
            limit,
            show_returning_flights
        } = req.query
        
        page = parseInt(page) || 1;  
        limit = parseInt(limit) || 5;
        show_returning_flights = false

        const skip = (page - 1) * limit;

        try {
            const adultPassengersTotal = Number(total_adult_passengers)
            const childPassengersTotal = Number(total_child_passengers)
            const infantPassengersTotal = Number(total_infant_passengers)

            const passengersTotal = adultPassengersTotal + childPassengersTotal + infantPassengersTotal
            const totalNoInfant = passengersTotal - infantPassengersTotal

            // if returning departure date is earlier than departing date
            ErrorHandler.validateReturnDate(returning_flight_departure_date, flight_departure_date)

            // validate maximum passenger total
            ErrorHandler.passengersTotalValidation(totalNoInfant, infantPassengersTotal, adultPassengersTotal)

            const airportTimezone = await AirportTimezone(departure_airport, arrival_airport, flight_departure_date, returning_flight_departure_date)

            const departingFlightsWhereClause = {
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
            }

            const returningFlightsWhereClause = {
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

            const selectFlightData = {
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

            const departingFlights = await prisma.flights.findMany({
                skip: skip,
                take: limit,
                where: departingFlightsWhereClause,
                select: selectFlightData
            })

            const returningFlights = await prisma.flights.findMany({
                skip: skip,
                take: limit,
                where: returningFlightsWhereClause,
                select: selectFlightData
            })

            
            let departingFlightsTotal = await prisma.flights.count({
                where: departingFlightsWhereClause
            })
            
            let returningFlightsTotal = await prisma.flights.count({
                where: returningFlightsWhereClause
            })
            
            // if no flights record found
            ErrorHandler.ifNoFlightsFound(departingFlights)

            if (show_returning_flights && returningFlights.length === 0) {
                ErrorHandler.ifNoFlightsFound(returningFlights);
            }

            // map departingFlights and returningFlights array respectively
            const mappedDepartingFlights = FlightDataMapper.mapFlights(departingFlights, seat_class_type);
            const mappedReturningFlights = FlightDataMapper.mapFlights(returningFlights, seat_class_type);

            // sort mappedFlights by query parameter of sort_by
            FlightDataFilters.sortFlights(mappedDepartingFlights, sort_by)
            FlightDataFilters.sortFlights(mappedReturningFlights, sort_by)

            // check if each flight has enough available seats for the total number of passengers (adults + children)
            let departingFlightSeatChecker = await FlightSeatChecker(mappedDepartingFlights, adultPassengersTotal, childPassengersTotal);
            let returningFlightSeatChecker = await FlightSeatChecker(mappedReturningFlights, adultPassengersTotal, childPassengersTotal);

            // check if all flights are full
            ErrorHandler.ifAllFlightsAreFull(departingFlightSeatChecker.filteredFlightsStatus, departingFlightSeatChecker.flightSeatCapacities)
            ErrorHandler.ifAllFlightsAreFull(returningFlightSeatChecker.filteredFlightsStatus, departingFlightSeatChecker.flightSeatCapacities)

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
                params.delete('flight_departure_date');
                params.delete('returning_flight_departure_date');
                params.delete('departure_airport');
                params.delete('arrival_airport');
                params.delete('is_round_trip');

                const encodedReturningFlightDepartureDate = encodeURIComponent(returning_flight_departure_date);
                const encodedFlightDepartureDate = encodeURIComponent(flight_departure_date);

                returningFlightsUrl = `${url.origin}${url.pathname}?${params.toString()}&flight_departure_date=${encodedReturningFlightDepartureDate}&departure_airport=${returningDepartureAirport}&arrival_airport=${returningArrivalAirport}&show_returning_flights=false`;
                fullUrlWithoutPageAndLimit = `${url.origin}${url.pathname}?${params.toString()}&flight_departure_date=${encodedFlightDepartureDate}&departure_airport=${departure_airport}&arrival_airport=${arrival_airport}&is_round_trip=${is_round_trip}&returning_flight_departure_date=${encodedReturningFlightDepartureDate}`;
            }

            return res.json({
                status: 'success',
                message: 'Berhasil menemukan penerbangan',
                debug: {
                    departingFlightSeatChecker: {
                        bookedTicketsFlightIds: departingFlightSeatChecker.bookedTicketsFlightIds,
                        bookedSeatsPerFlight: departingFlightSeatChecker.bookedSeatsPerFlight,
                        flightSeatCapacities: departingFlightSeatChecker.flightSeatCapacities,
                        filteredFlightsStatus: departingFlightSeatChecker.filteredFlightsStatus,
                        departingFlightsTotal: departingFlightsTotal
                    },
                    returningFlightSeatChecker: {
                        bookedTicketsFlightIds: returningFlightSeatChecker.bookedTicketsFlightIds,
                        bookedSeatsPerFlight: returningFlightSeatChecker.bookedSeatsPerFlight,
                        flightSeatCapacities: returningFlightSeatChecker.flightSeatCapacities,
                        filteredFlightsStatus: returningFlightSeatChecker.filteredFlightsStatus,
                        returningFlightsTotal: returningFlightsTotal
                    },
                    show_returning_flights: show_returning_flights
                },
                passengers: {
                    adult: adultPassengersTotal,
                    child: childPassengersTotal,
                    infant: infantPassengersTotal,
                    total_no_infant: totalNoInfant,
                    total: passengersTotal,
                },
                flights: show_returning_flights === false ? {
                    flights_data: mappedDepartingFlights,
                    returning_flights_url: returningFlightsUrl,
                    pagination: {
                        current_page: page,
                        limit: limit,
                        prev_url: page > 1 ? `${fullUrlWithoutPageAndLimit}&page=${page - 1}&limit=${limit}` : null,
                        next_url: page >= Math.ceil(Number(departingFlightsTotal) / Number(limit)) ? null : `${fullUrlWithoutPageAndLimit}&page=${page + 1}&limit=${limit}`,
                    },
                } : {
                    returning_flights: mappedReturningFlights,
                    pagination: {
                        current_page: page,
                        limit: limit,
                        prev_url: page > 1 ? `${fullUrlWithoutPageAndLimit}&page=${page - 1}&limit=${limit}` : null,
                        next_url: page >= Math.ceil(Number(returningFlightsTotal) / Number(limit)) ? null : `${fullUrlWithoutPageAndLimit}&page=${page + 1}&limit=${limit}`,
                    }
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
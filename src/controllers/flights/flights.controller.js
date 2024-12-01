const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DateTimeUtils = require('../../libs/datetime');
const Moment = require('../../libs/moment');
const Currency = require('../../libs/currency');

const ErrorHandler = require('./error_handler.utils');
const AirportTimezone = require('./airport_timezone.flights')
const FlightDataFilters = require('./filters.flights');
const BookedTicketCount = require('./ticket_count.flights');
const FlightSeatChecker = require('./flight_seat_checker.flights');

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
            sort_by
        } = req.query
        
        try {
            // const {
            // } = req.body
            const adultPassengersTotal = Number(total_adult_passengers)
            const childPassengersTotal = Number(total_child_passengers)
            const infantPassengersTotal = Number(total_infant_passengers)

            const passengersTotal = adultPassengersTotal + childPassengersTotal + infantPassengersTotal

            if(is_round_trip === "true") // if is_round_trip is true (yes)
                ErrorHandler.ifNoReturningDateInRoundTrip(returning_flight_departure_date)

            const airportTimezone = await AirportTimezone(departure_airport, arrival_airport, flight_departure_date, returning_flight_departure_date)

            const flights = await prisma.flights.findMany({
                where: {
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
                            ],
                        },
                        {
                            AND: [
                                {
                                    departure_airport: {
                                        airport_code: arrival_airport // flip between departure_aiport and arrival_airport
                                    }
                                },
                                {
                                    arrival_airport: {
                                        airport_code: departure_airport // flip between departure_aiport and arrival_airport
                                    }
                                },
                                {
                                    flight_departure_date: {
                                        gte: airportTimezone.pickedReturningDepartureDate.toISOString(),
                                        lt: DateTimeUtils.modifyHours(airportTimezone.pickedReturningDepartureDate, 24).toISOString()
                                    }
                                },
                            ]
                        }
                    ],
                    flight_seat_classes: {
                        some: {
                            seat_class: {
                                seat_class_type: seat_class_type
                            }
                        }
                    }
                },
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

            ErrorHandler.ifNoFlightsFound(flights) // if no flights record found

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
            
            // check if each flight has enough available seats for the total number of passengers (adults + children)
            const flightSeatChecker = await FlightSeatChecker(mappedFlights, adultPassengersTotal, childPassengersTotal);
            
            // filter to show departing flights by comparing departure_airport to departing departure_airport
            const departingFlights = FlightDataFilters.departingFlights(mappedFlights, departure_airport)

            // filter to show returning flights by comparing departing flight's arrival airport to returning flight's departure_airport
            const returningFlights = FlightDataFilters.returningFlights(mappedFlights, arrival_airport)

            let departingFlightsPagination = paginate(airportTimezone.pickedDepartureDate, airportTimezone.departureAirportTz.airport_time_zone)
            let returningFlightsPagination = paginate(airportTimezone.pickedReturningDepartureDate, airportTimezone.returningDepartureAirportTz.airport_time_zone)

            if(typeof returningFlights !== 'undefined' && returningFlights.length === 0 || !returning_flight_departure_date){
                returningFlightsPagination = []
            }

            if(typeof departingFlights !== 'undefined' && departingFlights.length === 0){
                departingFlightsPagination = []
            }

            return res.json({
                status: 'success',
                message: 'Berhasil menemukan penerbangan',
                debug: {
                    bookedTicketsFlightIds: flightSeatChecker.bookedTicketsFlightIds,
                    // totalFlightIds: totalFlightIds,
                    bookedSeatsPerFlight: flightSeatChecker.bookedSeatsPerFlight,
                    flightSeatCapacities: flightSeatChecker.flightSeatCapacities,
                    filteredFlightsStatus: flightSeatChecker.filteredFlightsStatus
                    // seatCapacity: seatCapacity
                },
                passengers: {
                    adult: adultPassengersTotal,
                    child: childPassengersTotal,
                    infant: infantPassengersTotal,
                    total_no_infant: passengersTotal - infantPassengersTotal,
                    total: passengersTotal,
                },
                departing_flights: {
                    flights: departingFlights,
                    pagination: departingFlightsPagination,
                },
                returning_flights: {
                    flights: returningFlights,
                    pagination: returningFlightsPagination,
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

        function paginate(dateTimeString, timezone) {
            const departureDate = new Date(dateTimeString);
            const newDate = [];
        
            for (let i = -3; i <= 4; i++) {  // from -3 to 4 (8 days total)
                const modifiedDate = DateTimeUtils.addDays(departureDate, i);
        
                const returningFlightDate = returning_flight_departure_date ? new Date(returning_flight_departure_date).toISOString() : new Date('1111-11-11 00:00:00').toISOString();

                let url;
                url = `${req.protocol}://${req.get('host')}/api/v1/flights?sort_by=lowest_price&departure_airport=${departure_airport}&arrival_airport=${arrival_airport}&is_round_trip=${is_round_trip}&flight_departure_date=${modifiedDate.toISOString()}&returning_flight_departure_date=${returningFlightDate}&seat_class_type=${seat_class_type}&total_adult_passengers=${total_adult_passengers}&total_child_passengers=${total_child_passengers}&total_infant_passengers=${total_infant_passengers}`;

                newDate.push({
                    date: DateTimeUtils.formatToID(modifiedDate, timezone),
                    day: DateTimeUtils.getDateWeekday(modifiedDate, timezone),
                    url: url
                });
            }

            return newDate;
        }        
    }
}

module.exports = FlightsController;
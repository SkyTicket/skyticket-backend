const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DateTimeUtils = require('../../libs/datetime');
const Luxon = require('../../libs/luxon');
const Moment = require('../../libs/moment');
const Currency = require('../../libs/currency');
const FlightsPagination = require('./flights.pagination');

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
            const passengersTotal = Number(total_adult_passengers) + Number(total_child_passengers) + Number(total_infant_passengers)

            if(is_round_trip === "true"){ // if is_round_trip is true (yes)
                if(!returning_flight_departure_date){ // if no returning flight date provided
                    throw {
                        statusCode: 400,
                        message: {
                            line_1: 'Tanggal penerbangan pulang belum diisi',
                            line_2: 'Mohon isi tanggal penerbangan pulang'
                        }
                    }
                }
            }

            const departureAirportTz = await prisma.airports.findFirst(({
                where: {
                    airport_code: departure_airport
                },
                select: {
                    airport_time_zone: true
                }
            }))

            const returningDepartureAirportTz = await prisma.airports.findFirst(({
                where: {
                    airport_code: arrival_airport
                },
                select: {
                    airport_time_zone: true
                }
            }))

            const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Asia/Jakarta, Asia/Kuala_Lumpur, etc...
            const systemTzOffset = Luxon.getTimezoneOffset(localTimezone); // timezone offset in hours
            const departureAirportTzOffset = Luxon.getTimezoneOffset(departureAirportTz.airport_time_zone); // timezone offset in hours
            const returningDepartureAirportTzOffset = Luxon.getTimezoneOffset(returningDepartureAirportTz.airport_time_zone); // timezone offset in hours

            let pickedReturningDepartureDate;
            let pickedDepartureDate = DateTimeUtils.modifyHours(flight_departure_date, systemTzOffset, -departureAirportTzOffset)
            pickedReturningDepartureDate = DateTimeUtils.modifyHours(returning_flight_departure_date, systemTzOffset, -returningDepartureAirportTzOffset)
            
            // if no returning_flight_departure_date provided
            if(!returning_flight_departure_date){
                pickedReturningDepartureDate = '1111-11-11 00:00:00'
            }

            const flights = await prisma.flights.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                {
                                    departure_airport: {
                                        airport_code: {
                                            equals: departure_airport,
                                            mode: 'default',
                                        }
                                    }
                                },
                                {
                                    departure_airport: {
                                        airport_code: {
                                            equals: arrival_airport,
                                            mode: 'default',
                                        }
                                    }
                                }
                            ],
                        },
                        {
                            OR: [
                                {
                                    arrival_airport: {
                                        airport_code: {
                                            equals: arrival_airport,
                                            mode: 'default'
                                        }
                                    }
                                },
                                {
                                    arrival_airport: {
                                        airport_code: {
                                            equals: departure_airport,
                                            mode: 'default'
                                        }
                                    }
                                }
                            ]
                        },
                    ],
                    flight_departure_date: {
                        gte: pickedDepartureDate.toISOString(),
                        lt: DateTimeUtils.modifyHours(pickedDepartureDate, 24).toISOString()
                    },
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
                            seat_class: true
                        },
                    },
                    flight_number: true,
                    flight_departure_date: true,
                    flight_arrival_date: true
                }
            })

            if(typeof flights !== 'undefined' && flights.length === 0){
                throw {
                    statusCode: 404,
                    message: {
                        line_1: 'Maaf, pencarian Anda tidak ditemukan',
                        line_2: 'Coba cari perjalanan lainnya!'
                    }
                }
            }

            const mappedFlights = flights.map((flight) => {
                const findBySeatClassType = flight.flight_seat_classes.find(flightSeatClass => {
                    return flightSeatClass.seat_class.seat_class_type === seat_class_type
                })
                
                return {
                    // pagination: FlightsPagination.paginate(pickedDepartureDate && pickedReturningDepartureDate, departureAirportTz.airport_time_zone && returningDepartureAirportTz.airport_time_zone),
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
                        raw_departure_datetime: new Date(flight.flight_departure_date).toISOString(),
                        raw_arrival_datetime: new Date(flight.flight_arrival_date).toISOString()
                    }
                }
            })

            // filter to show returning flights by comparing arrival airport to returning flight airport
            const returningFlights = mappedFlights.filter((returningFlight) => {
                if(returningFlight.departure_airport === arrival_airport){
                    return returningFlight
                }
            })

            // filter to show only based on returning_flight_departure_date request body
            const filterReturningFlightsByDepDate = returningFlights.filter((filteredReturningFlight) => {
                const convertedRawDepartureDatetime = DateTimeUtils.convertISOStringToDate(filteredReturningFlight.flight_details.raw_departure_datetime)
                const convertedDateLimit = DateTimeUtils.modifyHours(pickedReturningDepartureDate, 24)
                
                if(convertedRawDepartureDatetime >= pickedReturningDepartureDate && convertedRawDepartureDatetime < convertedDateLimit){
                    return filteredReturningFlight
                }
            })

            const departingFlights = mappedFlights.filter((departingFlight) => {
                if(departingFlight.departure_airport === departure_airport){
                    return departingFlight
                }
            })

            switch(sort_by){
                case 'lowest_price':
                    mappedFlights.sort((a,b) => (a.seat_class_price.raw > b.seat_class_price.raw) ? 1 : ((b.seat_class_price.raw > a.seat_class_price.raw) ? -1 : 0))
                break;
                case 'highest_price':
                    mappedFlights.sort((a,b) => (b.seat_class_price.raw > a.seat_class_price.raw) ? 1 : ((a.seat_class_price.raw > b.seat_class_price.raw) ? -1 : 0))
                break;
                case 'shortest_duration':
                    mappedFlights.sort((a,b) => (a.flight_duration.raw > b.flight_duration.raw) ? 1 : ((b.flight_duration.raw > a.flight_duration.raw) ? -1 : 0))
                break;
                case 'earliest_departure':
                    mappedFlights.sort((a,b) => (a.flight_details.raw_departure_datetime > b.flight_details.raw_departure_datetime) ? 1 : ((b.flight_details.raw_departure_datetime > a.flight_details.raw_departure_datetime) ? -1 : 0))
                break;
                case 'latest_departure':
                    mappedFlights.sort((a,b) => (b.flight_details.raw_departure_datetime > a.flight_details.raw_departure_datetime) ? 1 : ((a.flight_details.raw_departure_datetime > b.flight_details.raw_departure_datetime) ? -1 : 0))
                break;
                case 'earliest_arrival':
                    mappedFlights.sort((a,b) => (a.flight_details.raw_arrival_datetime > b.flight_details.raw_arrival_datetime) ? 1 : ((b.flight_details.raw_arrival_datetime > a.flight_details.raw_arrival_datetime) ? -1 : 0))
                break;
                case 'latest_arrival':
                    mappedFlights.sort((a,b) => (b.flight_details.raw_arrival_datetime > a.flight_details.raw_arrival_datetime) ? 1 : ((a.flight_details.raw_arrival_datetime > b.flight_details.raw_arrival_datetime) ? -1 : 0))
                break;
                default:
                    mappedFlights.sort((a,b) => (a.seat_class_price.raw > b.seat_class_price.raw) ? 1 : ((b.seat_class_price.raw > a.seat_class_price.raw) ? -1 : 0))
            }

            const departingFlightsPagination = paginate(pickedDepartureDate, departureAirportTz.airport_time_zone)
            const returningFlightsPagination = paginate(pickedReturningDepartureDate, returningDepartureAirportTz.airport_time_zone)

            return res.json({
                status: 'success',
                message: 'Berhasil menemukan penerbangan',
                passengers: {
                    adult: Number(total_adult_passengers),
                    child: Number(total_child_passengers),
                    infant: Number(total_infant_passengers),
                    total: passengersTotal,
                },
                departing_flights: {
                    flights: departingFlights,
                    pagination: departingFlightsPagination,
                },
                returning_flights: {
                    // Only include pagination and flights if returning_flight_departure_date is provided
                    ...(returning_flight_departure_date ? { pagination: returningFlightsPagination, flights: filterReturningFlightsByDepDate } : {}),
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
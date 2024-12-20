const DateTimeUtils = require('../../../libs/datetime');

const AirportTimezone = require('../helpers/airport_timezone.flights')
const{ PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FlightQueries {
    constructor(departureAirport, arrivalAirport, returningDepartureAirport, returningArrivalAirport){
        this.departureAirport = departureAirport
        this.arrivalAirport = arrivalAirport
        this.returningDepartureAirport = returningDepartureAirport
        this.returningArrivalAirport = returningArrivalAirport
    }

    async findManyFlights(skip, limit, flightDepartureDate, returningFlightDepartureDate, seatClassType){
        const airportTimezone = await AirportTimezone(this.departureAirport, this.arrivalAirport, flightDepartureDate, returningFlightDepartureDate)

            const departingFlightsWhereClause = {
                AND: [
                    {
                        departure_airport: {
                            airport_code: this.departureAirport
                        }
                    },
                    {
                        arrival_airport: {
                            airport_code: this.arrivalAirport
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
                                    seat_class_type: seatClassType
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
                            airport_code: this.returningDepartureAirport // flip between departure_aiport and arrival_airport
                        }
                    },
                    {
                        arrival_airport: {
                            airport_code: this.returningArrivalAirport // flip between departure_aiport and arrival_airport
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
                                    seat_class_type: seatClassType
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
                        airport_name: true,
                        airport_city: true
                    }
                },
                arrival_airport: {
                    select: {
                        airport_code: true,
                        airport_time_zone: true,
                        airport_name: true,
                        airport_city: true
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

            return {
                departingFlights: departingFlights,
                returningFlights: returningFlights,
                departingFlightsTotal: departingFlightsTotal,
                returningFlightsTotal: returningFlightsTotal
            }
    }
}

module.exports = FlightQueries;
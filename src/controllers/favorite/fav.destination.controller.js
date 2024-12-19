const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Currency = require('../../libs/currency');
const DateTimeUtils = require('../../libs/datetime');
const Luxon = require('../../libs/luxon');
const Moment = require('../../libs/moment');
const FavDestDateFormatter = require('./helpers/date_formatter');

class favDestination {
    static async favDestination(req, res) {
        const { page = 1, continent } = req.query;
        const limit = 5;
        const pageNumber = parseInt(page);
        const pageLimit = parseInt(limit);

        const skip = (pageNumber - 1) * pageLimit;

        const continentOptions = ['Asia', 'Amerika', 'Australia', 'Eropa', 'Afrika']

        const whereClause = !continentOptions.includes(continent) ? { // if the query param value is not one of the continent options
            flight_departure_date: {
                gte: new Date(), // Hanya penerbangan mendatang
            }, // if true, show all
        } : { // else, show by continent
            flight_departure_date: {
                gte: new Date(),
            },
            arrival_airport: {
                airport_continent: continent
            }
        }

        try {
            // Mengambil data
            const flights = await prisma.flights.findMany({
                where: whereClause,
                select: {
                    flight_id: true,
                    flight_number: true,
                    flight_departure_date: true,
                    flight_arrival_date: true,
                    airline: {
                        select: {
                            airline_name: true,
                            airline_code: true,
                        },
                    },
                    departure_airport: {
                        select: {
                            airport_name: true,
                            airport_city: true,
                            airport_country: true,
                            airport_code: true,
                            Airport_city_image: true,
                            airport_time_zone: true,
                        },
                    },
                    arrival_airport: {
                        select: {
                            airport_name: true,
                            airport_city: true,
                            airport_country: true,
                            airport_code: true,
                            Airport_city_image: true,
                            airport_time_zone: true,
                        },
                    },
                    flight_seat_classes: {
                        select: {
                            seat_class_price: true,
                            seat_class: {
                                select: {
                                    seat_class_type: true,
                                },
                            },
                        },
                        take: 1,
                        orderBy: {
                            seat_class_price: "asc", // Mengurutkan berdasarkan harga termurah
                        },
                    },
                },
                skip: skip,
                take: pageLimit,
            });

            // Formatting untuk data output
            const flightsData = await Promise.all(
                flights.map(async (flight) => {
                    const cheapestSeatClass = flight.flight_seat_classes[0];
                    const flightPrice = cheapestSeatClass?.seat_class_price || null;
                    const seatClassType = cheapestSeatClass?.seat_class?.seat_class_type || "N/A";

                    return {
                        flight_id: flight.flight_id,
                        flight_price: flightPrice,
                        seat_class: seatClassType,
                        flight_departure_date: flight.flight_departure_date,
                        flight_arrival_date: flight.flight_arrival_date,
                        airline: {
                            airline_name: flight.airline.airline_name,
                        },
                        departure_airport: {
                            airport_city: flight.departure_airport.airport_city,
                            airport_country: flight.departure_airport.airport_country,
                            airport_code: flight.departure_airport.airport_code,
                            airport_city_image: flight.departure_airport.Airport_city_image,
                            airport_time_zone: flight.departure_airport.airport_time_zone
                        },
                        arrival_airport: {
                            airport_city: flight.arrival_airport.airport_city,
                            airport_country: flight.arrival_airport.airport_country,
                            airport_code: flight.arrival_airport.airport_code,
                            airport_city_image: flight.arrival_airport.Airport_city_image,
                            airport_time_zone: flight.arrival_airport.airport_time_zone
                        },
                        // Menampilkan promo berdasarkan harga
                        promo: flightPrice
                            ? flightPrice < 1000000
                                ? "Limited!"
                                : flightPrice <= 5000000
                                    ? "50% OFF"
                                    : null
                                : null,
                    };
                })
            );

            const totalFlights = await prisma.flights.count({
                where: whereClause
            });

            const totalPages = Math.ceil(totalFlights / pageLimit);

            // Respon data
            if(!flights || flights.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan",
                });
            }

            // Format response final output
            const formattedFlights = flightsData
            .map((flight) => {                
                let flightDepartureDate = new Date(flight.flight_departure_date);
                const departureAirportTzOffset = Luxon.getTimezoneOffset(flight.departure_airport.airport_time_zone);
                flightDepartureDate = DateTimeUtils.modifyHours(flightDepartureDate, departureAirportTzOffset).toISOString()
                const formattedFlightDepartureDate = encodeURIComponent(Moment.formatToSQLDateTime(flightDepartureDate))

                return {
                    route: `${flight.departure_airport.airport_city} → ${flight.arrival_airport.airport_city}`,
                    airline: flight.airline.airline_name,
                    travel_date: FavDestDateFormatter.formattedDate(flight.flight_departure_date, flight.flight_arrival_date, flight.departure_airport.airport_time_zone, flight.arrival_airport.airport_time_zone),
                    price: flight.flight_price ? Currency.format(flight.flight_price) : null,
                    promo: flight.promo || null,
                    city_image: flight.arrival_airport.airport_city_image || "default-image.jpg",
                    url: `https://${req.get('host')}/api/v1/flights?departure_airport=${flight.departure_airport.airport_code}&arrival_airport=${flight.arrival_airport.airport_code}&is_round_trip=false&flight_departure_date=${(formattedFlightDepartureDate)}&seat_class_type=Economy&total_adult_passengers=1`,
                    departure_city: flight.departure_airport.airport_city,
                    arrival_city: flight.arrival_airport.airport_city,
                }
            })

            return res.status(200).json({
                success: true,
                currentPage: pageNumber,
                totalPages,
                totalFlights,
                limit: pageLimit,
                data: formattedFlights
            });
        } catch(error) {
            console.error("Error fetching favorite destinations", error);
            return res.status(500).json({ success: false, message: "Gagal menampilkan destinasi favorit" });
        }
    }
}

module.exports = favDestination;
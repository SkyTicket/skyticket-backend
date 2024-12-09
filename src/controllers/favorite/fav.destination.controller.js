const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { countries } = require('countries-list');
const Currency = require('../../libs/currency');

class favDestination {
    static async favDestination(req, res) {
        const { page = 1, continent } = req.query;
        const limit = 5;
        const pageNumber = parseInt(page);
        const pageLimit = parseInt(limit);

        const skip = (pageNumber - 1) * pageLimit;

        const continentMap = {
            "AF": "Africa",
            "AN": "Antarctica",
            "AS": "Asia",
            "EU": "Europe",
            "OC": "Oceania",
            "NA": "North America",
            "SA": "South America",
        };
        
        function getContinent(countryName) {
            if (!countryName) {
                console.error("Country name is undefined or empty:", countryName);
                return { country: "Unknown", continent: "Unknown" };
            }

            const country = countries;
            const countryEntry = Object.values(country).find((entry) => {
                return entry.name &&entry.name.toLowerCase() === countryName.toLowerCase();
            });

            if (countryEntry) {
                return {
                    country: countryEntry.name,
                    continent: continentMap[countryEntry.continent] || "unknown",
                };
            }

            return {
                country: countryName,
                continent: "Unknown",
            };
        }

        try {
            // Mengambil data
            const flights = await prisma.flights.findMany({
                where: {
                    flight_departure_date: {
                        gte: new Date(), // Hanya penerbangan mendatang
                    },
                },
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
                    const departureCountry = flight.departure_airport.airport_country;
                    const arrivalCountry = flight.arrival_airport.airport_country;

                    const departureContinent = await getContinent(departureCountry);
                    const arrivalContinent = await getContinent(arrivalCountry);

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
                            continent: departureContinent.continent,
                            airport_city_image: flight.departure_airport.Airport_city_image,
                            airport_time_zone: flight.departure_airport.airport_time_zone
                        },
                        arrival_airport: {
                            airport_city: flight.arrival_airport.airport_city,
                            airport_country: flight.arrival_airport.airport_country,
                            continent: arrivalContinent.continent,
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
                where: {
                    flight_arrival_date: {
                        gte: new Date(),
                    },
                },
            });

            const totalPages = Math.ceil(totalFlights / pageLimit);

            // Respon data
            if(!flights || flights.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Data tidak ditemukan",
                });
            }

            // Format tanggal
            const formattedDate = (startDate, endDate) => {
                if(!startDate || !endDate) return null;
                const options = { day: '2-digit', month: 'long', year: 'numeric' };

                const start = new Date(startDate).toLocaleDateString('id-ID', options);
                const end = new Date(endDate).toLocaleDateString('id-ID', options);

                const [startDay, startMonth, startYear] = start.split(' ');
                const [endDay, endMonth, endYear] = end.split(' ');

                if(startMonth === endMonth && startYear === endYear) {
                    return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
                }

                if(startYear === endYear) {
                    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
                }

                return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
            }

            // Format response final output
            const formattedFlights = flightsData
            .filter((flight) => {
                if(!continent) return true;
                const continentLower = continent.toLowerCase();
                const departureContinent = flight.departure_airport.continent?.toLowerCase() || "unknown";
                const arrivalContinent = flight.arrival_airport.continent?.toLowerCase() || "unknown";

                return (
                    departureContinent === continentLower || arrivalContinent === continentLower
                );
            })
            .map((flight) => {
                const departureContinent = getContinent(flight.departure_airport.airport_country);
                const arrivalContinent = getContinent(flight.arrival_airport.airport_country);

                return {
                    route: `${flight.departure_airport.airport_city} → ${flight.arrival_airport.airport_city}`,
                    airline: flight.airline.airline_name,
                    travel_date: formattedDate(flight.flight_departure_date, flight.flight_arrival_date),
                    price: flight.flight_price ? Currency.format(flight.flight_price) : null,
                    promo: flight.promo || null,
                    city_image: flight.arrival_airport.airport_city_image || "default-image.jpg",
                }
            })

            res.status(200).json({
                success: true,
                currentPage: pageNumber,
                totalPages,
                totalFlights,
                limit: pageLimit,
                data: formattedFlights
            });
        } catch(error) {
            console.error("Error fetching favorite destinations", error);
            res.status(500).json({ success: false, message: "Gagal menampilkan destinasi favorit" });
        }
    }
}

module.exports = favDestination;
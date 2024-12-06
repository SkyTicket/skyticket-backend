const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cities = require('all-the-cities');
const { countries } = require('countries-list');

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
        const citiesCache = {};
        cities.forEach((city) => {
            citiesCache[city.name.toLowerCase()] = city;
        })
        const getContinent = (city) => {
            const cityData = citiesCache[city.toLowerCase()];
            if(!cityData) {
                console.warn(`City not found: ${city}`);
                return { country: "Unknown", continent: "Unknown"};
            }

            const countryCode = cityData.country;
            const country = countries[countryCode];

            if(country) {
                const continentCode = country.continent;
                const countryName = country.name;
                const continentName = continentMap[continentCode] || "Unknown";

                return { country: countryName, continent: continentName };
            }

            console.warn(`Country not found: ${countryCode}`);
            return { country: "Unknown", continent: "Unknown" };
        };

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
                    flight_price: true,
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
                            airport_code: true,
                            airport_city_image: true,
                            airport_time_zone: true,
                        },
                    },
                    arrival_airport: {
                        select: {
                            airport_name: true,
                            airport_city: true,
                            airport_code: true,
                            airport_city_image: true,
                            airport_time_zone: true,
                        },
                    }
                },
                orderBy: {
                    flight_price: "asc", // Mengurutkan berdasarkan harga termurah
                },
                skip: skip,
                take: pageLimit,
            });

            // Formatting untuk data output
            const flightsData = await Promise.all(
                flights.map(async (flight) => {
                    const departureContinent = await getContinent(flight.departure_airport.airport_city);
                    const arrivalContinent = await getContinent(flight.arrival_airport.airport_city);

                    return {
                        flight_id: flight.flight_id,
                        flight_price: flight.flight_price,
                        flight_departure_date: flight.flight_departure_date,
                        flight_arrival_date: flight.flight_arrival_date,
                        airline: {
                            airline_name: flight.airline.airline_name,
                        },
                        departure_airport: {
                            airport_city: flight.departure_airport.airport_city,
                            country: departureContinent.country,
                            continent: departureContinent.continent,
                            airport_city_image: flight.departure_airport.airport_city_image,
                            airport_time_zone: flight.departure_airport.airport_time_zone
                        },
                        arrival_airport: {
                            airport_city: flight.arrival_airport.airport_city,
                            country: arrivalContinent.country,
                            continent: arrivalContinent.continent,
                            airport_city_image: flight.arrival_airport.airport_city_image,
                            airport_time_zone: flight.arrival_airport.airport_time_zone
                        },
                        // Menampilkan promo berdasarkan harga
                        promo:
                            flight.flight_price < 1000000
                                ? "Limited!"
                                : flight.flight_price <= 5000000
                                    ? "50% OFF"
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
                return res.json({
                    success: true,
                    currentPage: pageNumber,
                    totalPages: 0,
                    totalFlights: 0,
                    limit: pageLimit,
                    data: {
                        flights: [],
                    },
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
                const departureContinent = getContinent(flight.departure_airport.airport_city);
                const arrivalContinent = getContinent(flight.arrival_airport.airport_city);

                return {
                    route: `${flight.departure_airport.airport_city} -> ${flight.arrival_airport.airport_city}`,
                    airline: flight.airline.airline_name,
                    travel_date: formattedDate(flight.flight_departure_date, flight.flight_arrival_date),
                    price: `IDR ${flight.flight_price.toLocaleString('id-ID')}`,
                    promo: flight.promo || null,
                    city_image: flight.arrival_airport.airport_city_image || "default-image.jpg",
                }
            })

            res.json({
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
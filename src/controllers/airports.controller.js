const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AirportsController {
    static async airportMapping(airports){
        airports.map((airport) => {
            return {
                airport: `${airport.airport_code} - ${airport.airport_city}`
            }
            // return `${airport.airport_code} - ${airport.airport_city}`
        })
    }

    static async searchAirports(req, res, next){
        const airport = req.query.airport
        // const airports = [];
        try {
            if(!airport){
                const airports = await prisma.airports.findMany({
                    orderBy: {
                        airport_country: 'asc'
                    },
                    take: 5
                })

                // const mappedAirports = AirportsController.airportMapping(airports);
                const mappedAirports = airports.map((airport) => {
                    return {
                        airport: `${airport.airport_code} - ${airport.airport_city}`,
                        input_value: airport.airport_code
                    }
                    // return `${airport.airport_code} - ${airport.airport_city}`
                })
            
                return res.json({
                    status: 'success',
                    airports: mappedAirports
                })
            }

            const airports = await prisma.airports.findMany({
                where: {
                    OR: [
                        {
                            airport_country: { // search by country
                                contains: airport,
                                mode: 'insensitive'
                            }
                        }, // OR
                        {
                            airport_city: { // search by city
                                contains: airport,
                                mode: 'insensitive'
                            }
                        }
                    ]
                },
                select: {
                    airport_code: true,
                    airport_city: true
                }
            })

            // const mappedAirports = AirportsController.airportMapping(airports);
            const mappedAirports = airports.map((airport) => {
                return {
                    airport: `${airport.airport_code} - ${airport.airport_city}`,
                    input_value: airport.airport_code
                }
                // return `${airport.airport_code} - ${airport.airport_city}`
            })

            if(typeof airports !== 'undefined' && airports.length === 0){ // if no country or city not found based on the search
                throw {
                    statusCode: 404,
                    message: 'Negara atau kota tidak ditemukan'
                }
            }

            return res.json({
                status: 'success',
                airports: mappedAirports
            })
        } catch(err) {
            if(res.statusCode){
                return res.status(err.statusCode).json({
                    status: 'error',
                    message: err.message
                })
            }
            next(err)
        }
    }
}

module.exports = AirportsController;
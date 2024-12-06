const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AirportsController {
    static airportMapping(airports){
        return airports.map((airport) => {
            return {
                airport: `${airport.airport_code} - ${airport.airport_city}`,
                input_value: airport.airport_code
            }
        })
    }

    static async searchAirports(req, res, next){
        const airport = req.query.airport
        try {
            let mappedAirports;

            // default result
            if(!airport){
                const airports = await prisma.airports.findMany({
                    orderBy: {
                        airport_country: 'asc'
                    },
                    take: 5
                })

                mappedAirports = AirportsController.airportMapping(airports)
            
                return res.json({
                    status: 'success',
                    airports: mappedAirports
                })
            }

            // result by search
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

            mappedAirports = AirportsController.airportMapping(airports)

            // if no country or city not found based on the search
            if(typeof airports !== 'undefined' && airports.length === 0){
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
            if(err.statusCode){
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
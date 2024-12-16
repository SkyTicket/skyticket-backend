const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const AirportTimezone = require('../helpers/airport_timezone.flights');
const DateTimeUtils = require('../../../libs/datetime');
const Currency = require('../../../libs/currency');
const ErrorHandler = require('../utils/errorHandler');

class SeatClassesController {
    static async seatClassPrice(req, res, next){
        const {
            departure_airport,
            arrival_airport,
            flight_departure_date,
            returning_flight_departure_date,
        } = req.query

        try {
            // if the input is not complete
            if(!departure_airport || !arrival_airport || !flight_departure_date){
                ErrorHandler.getSeatClassesPriceError()
            }
    
            const airportTimezone = await AirportTimezone(departure_airport, arrival_airport, flight_departure_date, returning_flight_departure_date)
    
            const flights = await prisma.flight_seat_classes.findMany({
                where: {
                    flight: {
                        departure_airport: {
                            airport_code: departure_airport
                        },
                        arrival_airport: {
                            airport_code: arrival_airport
                        },
                        flight_departure_date: {
                            gte: airportTimezone.pickedDepartureDate.toISOString(),
                            lt: DateTimeUtils.modifyHours(airportTimezone.pickedDepartureDate, 24).toISOString()
                        }
                    }
                },
                select: {
                    flight_id: true,
                    seat_class: {
                        select: {
                            seat_class_type: true
                        }
                    },
                    seat_class_price: true
                }
            })

            // if no flights found
            ErrorHandler.ifNoFlightsFound(flights);
    
            // Daftar fix seat class
            const seatClassTypes = ["Economy", "Premium Economy", "Business", "First Class"];
    
            // Map untuk mencari harga yang tersedia
            const seatPriceMap = flights.reduce((map, flight) => {
            const type = flight.seat_class.seat_class_type;
            if (!map.has(type)) {
                map.set(type, flight.seat_class_price);
            }
            return map;
            }, new Map());
    
            // Hasil akhir dengan 4 tipe fix
            const result = seatClassTypes.map((type) => {
                const price = seatPriceMap.get(type); // Ambil harga dari map
    
                return {
                    seat_class_type: type,
                    seat_class_price: price 
                    ? Currency.format(price) // Format jika harga ada
                    : `Tidak ada ${type} Seat untuk penerbangan ini`, // Jika tidak ada harga
                  input_value: type.replace(/\s+/g, "") // Hapus semua spasi
                };
            });
    
            return res.json({
                status: 'success',
                message: 'Berhasil menemukan flight seat classes data',
                seats_data: result
                // seats_data: flights
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

module.exports = SeatClassesController;
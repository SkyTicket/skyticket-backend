require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class EticketQueries {
    static async eticketGeneratorFindUnique(bookingId){
        const transaksi = await prisma.bookings.findUnique({
            where: {
                booking_id: bookingId
            },
            select: {
                booking_id: true,
                booking_code: true,
                booking_payment_status: true,
                user: {
                    select: {
                        user_email: true,
                        user_name: true,
                        user_id: true
                    }
                },
                tickets: {
                    select: {
                        flight_seat_assigment: {
                            select: {
                                flight_seat_class: {
                                    select: {
                                        flight: {
                                            select: {
                                                departure_airport: {
                                                    select: {
                                                        airport_code: true,
                                                        airport_time_zone: true
                                                    }
                                                },
                                                arrival_airport: {
                                                    select: {
                                                        airport_code: true
                                                    }
                                                },
                                                airline: {
                                                    select: {
                                                        airline_name: true,
                                                        airline_code: true
                                                    }
                                                },
                                                flight_number: true,
                                                flight_departure_date: true
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        })

        return { transaksi }
    }

    static async eticketShowFindUnique(bookingId){
        const transaksi = await prisma.bookings.findUnique({
            where: { booking_id: bookingId },
            include: {
            tickets: {
                include: {
                passanger: true,
                flight_seat_assigment: {
                    include: {
                    seat: true,
                    flight_seat_class: {
                        include: {
                        seat_class: true,
                        flight: {
                            include: {
                            airline: true,
                            departure_airport: true,
                            arrival_airport: true,
                            },
                        },
                        },
                    },
                    },
                },
                },
            },
            },
        });

        return { transaksi }
    }
}

module.exports = EticketQueries;
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const DateTimeUtils = require("../../libs/datetime");
const Currency = require("../../libs/currency");
const Moment = require("../../libs/moment");

class EticketController {
    static async showEticket(req, res) {
    try {
        const { bookingId } = req.params;

        if (!bookingId) {
            return res.status(400).render("error", {
            statusCode: 400,
            status: "Failed",
            message: "Booking ID diperlukan",
            data: [],
            });
        }

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

        if (!transaksi) {
            return res.status(404).render("error", {
            statusCode: 404,
            status: "Failed",
            message:
                "Tidak ada transaksi ditemukan untuk Booking ID yang diberikan",
            data: [],
            });
        }

        // Format data transaksi
        const flightTicket = transaksi.tickets[0].flight_seat_assigment?.flight_seat_class;

        const passengerCategory = (category) => {
            return transaksi.tickets.filter(
            (passenger) => passenger.category === category
            );
        };

        const amountDetails = {
            adults: `${passengerCategory("Adult").length} Adults`,
            adults_amount_total: Currency.format(
            passengerCategory("Adult").length * flightTicket.seat_class_price
            ),
            ...(passengerCategory("Child").length > 0 && {
            children: `${passengerCategory("Child").length} Children`,
            children_amount_total: Currency.format(
                passengerCategory("Child").length * flightTicket.seat_class_price
            ),
            }),
            ...(passengerCategory("Baby").length > 0 && {
            babies: `${passengerCategory("Baby").length} Babies`,
            babies_amount_total: Currency.format(
                passengerCategory("Baby").length * 0
            ),
            }),
            tax: Currency.format(transaksi.tax),
            booking_amount_total: Currency.format(Number(transaksi.booking_amount)),
        };

        const formattedTransaksi = {
            departure_airport_city_and_code: `${flightTicket.flight.departure_airport.airport_city} (${flightTicket.flight.departure_airport.airport_code})`,
            departure_airport_name:
            flightTicket.flight.departure_airport.airport_name,
            flight_duration: Moment.timeDifferenceFormatted(
            flightTicket.flight.flight_arrival_date,
            flightTicket.flight.flight_departure_date
            ),
            arrival_airport_city_and_code: `${flightTicket.flight.arrival_airport.airport_city} (${flightTicket.flight.arrival_airport.airport_code})`,
            arrival_airport_name: flightTicket.flight.arrival_airport.airport_name,
            booking_code: transaksi.booking_code,
            seat_class_type: flightTicket.seat_class.seat_class_type || "Unknown",
            booking_amount: Currency.format(transaksi.booking_amount),
            passangers_total: {
            adult: passengerCategory("Adult").length,
            child: passengerCategory("Child").length,
            baby: passengerCategory("Baby").length,
            },
            ticket: {
            eticket_url: `${req.protocol}://${req.get('host')}/api/v1/transaksi/eticket/${transaksi.booking_id}`,
            eticket_filename: `${flightTicket.flight.departure_airport.airport_code}-${flightTicket.flight.arrival_airport.airport_code}_${transaksi.booking_code}`,
            flight_departure_airport_name:
                flightTicket.flight.departure_airport.airport_name || "N/A",
            flight_arrival_airport_name:
                flightTicket.flight.arrival_airport.airport_name || "N/A",
            airline: flightTicket.flight.airline.airline_name,
            seat_class: flightTicket.seat_class.seat_class_type,
            flight_number: `${flightTicket.flight.airline.airline_code}-${flightTicket.flight.flight_number}`,
            // airline_and_seat_class: `${flightTicket.flight.airline.airline_name} - ${flightTicket.seat_class.seat_class_type}`,
            flight_number: `${flightTicket.flight.airline.airline_code} - ${flightTicket.flight.flight_number}`,
            airline_logo: flightTicket.flight.airline.Airline_logo || "N/A",
            passengers: transaksi.tickets.map((passenger) => ({
                seat: passenger.flight_seat_assigment.seat.seat_number,
                type: passenger.passanger.category,
                name: `${
                passenger.passanger.title
                }. ${passenger.passanger.familyName.toUpperCase()}, ${
                passenger.passanger.name
                }`,
            })),
            seat_class_price: {
                raw: flightTicket.seat_class_price || 0,
                formatted: Currency.format(flightTicket.seat_class_price || 0),
            },
            departure_date: DateTimeUtils.formatDateByTimezone(
                flightTicket.flight.flight_departure_date,
                flightTicket.flight.departure_airport.airport_time_zone
            ),
            departure_time: DateTimeUtils.formatHoursByTimezone(
                flightTicket.flight.flight_departure_date,
                flightTicket.flight.departure_airport.airport_time_zone
            ),
            arrival_date: DateTimeUtils.formatDateByTimezone(
                flightTicket.flight.flight_arrival_date,
                flightTicket.flight.arrival_airport.airport_time_zone
            ),
            arrival_time: DateTimeUtils.formatHoursByTimezone(
                flightTicket.flight.flight_arrival_date,
                flightTicket.flight.arrival_airport.airport_time_zone
            ),
            amount_details: amountDetails,
            },
        };

        if(transaksi.booking_payment_status === 'Issued'){

            return res.render("eticket", {
                statusCode: 200,
                payment_status: transaksi.booking_payment_status,
                transaction_data: formattedTransaksi,
            });
        } else {
            return res.render("eticket", {
                statusCode: 200,
                payment_status: transaksi.booking_payment_status,
                transaction_data: formattedTransaksi,
            });
        }

        } catch (error) {
        console.error("Error retrieving transaction details:", error.message);

        res.status(500).render("error", {
            statusCode: 500,
            status: "failed",
            message: "Terjadi kesalahan pada server",
            details: error.message,
        });
        }
    }
}

module.exports = EticketController;
require("dotenv").config();
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const DateTimeUtils = require("../../libs/datetime");
const Currency = require("../../libs/currency");
const Moment = require("../../libs/moment");

const { STAGING_SERVER_NO_SSL, PRODUCTION_SERVER_NO_SSL, NODE_ENV } =
  process.env;

const MIDTRANS_API_URL =
  "https://app.sandbox.midtrans.com/snap/v1/transactions";
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
function calculateTotalPrice(booking) {
  return Math.floor(booking.booking_amount);
}

class ShowTransactionControllerByIdUser {
  static async showTransaksiByIdUser(req, res) {
    try {
      const authToken = req.headers.authorization?.split(" ")[1];

      if (!authToken) {
        return res.status(401).json({
          statusCode: 401,
          status: "Failed",
          message: "Token tidak ditemukan",
          data: [],
        });
      }

      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      console.log(decoded);
      const userId = decoded.userID;

      if (!userId) {
        return res.status(400).json({
          statusCode: 400,
          status: "Failed",
          message: "User ID is required",
          data: [],
        });
      }

      const transaksi = await prisma.bookings.findMany({
        where: { user_id: userId },
        include: {
          tickets: {
            include: {
              passanger: true, // Mengambil data penumpang
              flight_seat_assigment: {
                include: {
                  seat: true,
                  flight_seat_class: {
                    include: {
                      seat_class: true,
                      flight: {
                        include: {
                          airline: true, // Mengambil data maskapai
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

      if (!transaksi || transaksi.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          status: "failed",
          message: "Tidak ada transaksi ditemukan",
          data: [],
        });
      }

      // Format data transaksi
      const groupedTransaksi = transaksi.reduce((grouped, booking) => {
        const flightTicket =
          booking.tickets[0].flight_seat_assigment?.flight_seat_class;

        const passengerCategory = (category) => {
          return booking.tickets.filter(
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
          tax: Currency.format(booking.tax),
          booking_amount_total: Currency.format(Number(booking.booking_amount)),
        };

        let sendEticketUrl = `${req.protocol}://${req.get(
          "host"
        )}/api/v1/transaksi/eticket-trigger/${booking.booking_id}`;
        if (NODE_ENV === "staging") {
          sendEticketUrl = `${STAGING_SERVER_NO_SSL}/api/v1/transaksi/eticket-trigger/${booking.booking_id}`;
        } else if (NODE_ENV === "production") {
          sendEticketUrl = `${PRODUCTION_SERVER_NO_SSL}/api/v1/booking/eticket-trigger/${booking.booking_id}`;
        }

        const formattedData = {
          booking_payment_status: booking.booking_payment_status,
          departure_airport_city:
            flightTicket.flight.departure_airport.airport_city,
          flight_duration: Moment.timeDifferenceFormatted(
            flightTicket.flight.flight_arrival_date,
            flightTicket.flight.flight_departure_date
          ),
          arrival_airport_city:
            flightTicket.flight.arrival_airport.airport_city,
          booking_code: booking.booking_code,
          seat_class_type: flightTicket.seat_class.seat_class_type || "Unknown",
          booking_amount: Currency.format(booking.booking_amount),
          passangers_total: {
            adult: passengerCategory("Adult").length,
            child: passengerCategory("Child").length,
            baby: passengerCategory("Baby").length,
          },
          ticket: {
            flight_departure_airport_name:
              flightTicket.flight.departure_airport.airport_name || {},
            flight_arrival_airport_name:
              flightTicket.flight.arrival_airport.airport_name || {},
            airline_and_seat_class: `${flightTicket.flight.airline.airline_name} - ${flightTicket.seat_class.seat_class_type}`,
            flight_number: `${flightTicket.flight.airline.airline_code} - ${flightTicket.flight.flight_number}`,
            airline_logo: flightTicket.flight.airline.Airline_logo || "N/A",
            passengers: booking.tickets.map((passenger) => {
              return [
                {
                  id: passenger.passanger.passenger_id,
                  name: `${passenger.passanger.title}. ${
                    passenger.passanger.name
                  } ${
                    passenger.passanger.familyName
                      ? passenger.passanger.familyName
                      : ""
                  }`,
                },
              ];
            }),
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
            send_eticket_url: sendEticketUrl,
            amount_details: amountDetails,
          },
        };

        // take departure date for grouping
        const departureDate = new Date(
          flightTicket.flight.flight_departure_date
        );
        const monthYearKey = `${departureDate.toLocaleString("id-ID", {
          month: "long",
        })} ${departureDate.getFullYear()}`;

        // group by monthYearKey
        if (!grouped[monthYearKey]) {
          grouped[monthYearKey] = [];
        }
        grouped[monthYearKey].push(formattedData);

        return grouped;
      }, {}); // initial value = {}

      return res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Successfully retrieved transactions",
        transactions_data: groupedTransaksi,
      });
    } catch (error) {
      console.error("Error retrieving transactions:", error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
          statusCode: 400,
          status: "failed",
          message: "Kesalahan dalam permintaan ke database",
          details: error.message,
        });
      }

      return res.status(500).json({
        statusCode: 500,
        status: "failed",
        message: "Terjadi kesalahan pada server",
        details: error.message,
      });
    }
  }
}

module.exports = ShowTransactionControllerByIdUser;

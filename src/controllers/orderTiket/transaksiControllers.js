require("dotenv").config();
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const DateTimeUtils = require("../../libs/datetime");
const Currency = require("../../libs/currency");
const Moment = require("../../libs/moment");

const MIDTRANS_API_URL =
  "https://app.sandbox.midtrans.com/snap/v1/transactions";
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
function calculateTotalPrice(booking) {
  return Math.floor(booking.booking_amount);
}

class PaymentController {
  static async showTransaksi(req, res) {
    try {
      const transaksi = await prisma.bookings.findMany();
      if (!transaksi || transaksi.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          status: "failed",
          message: "Tidak ada transaksi ditemukan",
          data: [],
        });
      }

      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Berhasil menampilkan list transaksi",
        data: transaksi,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);

      // Menangani kesalahan koneksi database
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
          statusCode: 400,
          status: "failed",
          message: "Kesalahan dalam permintaan ke database",
          details: error.message,
        });
      }
      // Menangani kesalahan koneksi database
      if (error instanceof Prisma.PrismaClientInitializationError) {
        return res.status(503).json({
          statusCode: 503,
          status: "failed",
          message: "Kesalahan koneksi ke database",
          details: error.message,
        });
      }
      res.status(500).json({
        statusCode: 500,
        status: "failed",
        message: "Terjadi kesalahan pada server",
        details: error.message,
      });
    }
  }
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

  static async createPayment(req, res) {
    try {
      const { bookingId } = req.params;

      const userId = req.user.user_id;
      if (!userId) {
        throw {
          statusCode: 401,
          status: "Failed",
          message: "UserID tidak ditemukan dalam token.",
        };
      }

      const booking = await prisma.bookings.findUnique({
        where: { booking_id: bookingId },
      });
      if (!booking) {
        return res.status(404).json({ error: "id booking tidak ada" });
      }

      const totalPrice = calculateTotalPrice(booking);
      console.log("Total Price:", totalPrice);
      const now = new Date();
      const startTime =
        now.toISOString().slice(0, 19).replace("T", " ") + " +0000";
      const expiryDuration = 1;
      const expiryTime = new Date(
        now.getTime() + expiryDuration * 60 * 60 * 1000
      );

      // Format waktu kedaluwarsa ke format jam (HH:mm:ss)
      const expiryHours = expiryTime.getHours().toString().padStart(2, "0");
      const expiryMinutes = expiryTime.getMinutes().toString().padStart(2, "0");
      const expirySeconds = expiryTime.getSeconds().toString().padStart(2, "0");
      const formattedExpiryTime = `${expiryHours}:${expiryMinutes}:${expirySeconds}`;

      const user = await prisma.users.findUnique({
        where: { user_id: userId },
        select: { user_name: true, user_email: true, user_phone: true },
      });

      if (!user) {
        throw {
          statusCode: 404,
          status: "Failed",
          message: "Data pengguna tidak ditemukan.",
        };
      }
      const snapPayload = {
        transaction_details: {
          order_id: booking.booking_code,
          gross_amount: totalPrice,
        },
        customer_details: {
          first_name: user.user_name || "Anonymous",
          email: user.user_email || "no-email@example.com",
          phone: user.user_phone || "0000000000",
        },
        item_details: [
          {
            id: booking.booking_code,
            price: totalPrice,
            quantity: 1,
            name: "Ticket Payment",
          },
        ],
        expiry: {
          start_time: startTime,
          unit: "hour",
          duration: expiryDuration,
        },
      };
      const response = await axios.post(MIDTRANS_API_URL, snapPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + Buffer.from(MIDTRANS_SERVER_KEY).toString("base64"),
        },
      });
      const redirectUrl = response.data.redirect_url;
      const token = response.data.token;

      await prisma.bookings.update({
        where: { booking_id: bookingId },
        data: {
          booking_payment_status: "Unpaid",
          booking_payment_method: "Midtrans",
        },
      });
      await prisma.notifications.create({
        data: {
          user_id: userId,
          notification_type: "TRANSACTION",
          notification_message: `Segera lakukan pembayaran untuk kode booking ${booking.booking_code} sebelum ${formattedExpiryTime}.`,
          notification_is_read: false,
        },
      });

      res.status(201).json({
        message: "Berhasil membuat pembayaran",
        booking_id: bookingId,
        booking_code: booking.booking_code,
        token: token,
        redirect_url: redirectUrl,
        expiry_time: formattedExpiryTime,
        payment_reminder: `Segera lakukan pembayaran untuk kode booking ${booking.booking_code} sebelum ${formattedExpiryTime}.`,
      });
    } catch (error) {
      console.error("Gagal membuat pembayaran", error.message);
      if (error.response) {
        return res.status(error.response.status).json({
          error: `Midtrans API error: ${
            error.response.data.error_messages || "Unknown error"
          }`,
        });
      }
      return res
        .status(500)
        .json({ error: "server error", message: error.message });
    }
  }

  static async paymentNotification(req, res) {
    const { order_id, transaction_status, payment_type } = req.body;

    try {
      const booking = await prisma.bookings.findUnique({
        where: { booking_code: order_id },
      });

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      let newStatus = "Unpaid";
      let notificationMessage = `Transaksi untuk kode booking ${order_id} belum selesai.`;

      switch (transaction_status) {
        case "capture":
        case "settlement":
          newStatus = "Issued";
          notificationMessage = `Pembayaran tiket untuk kode booking ${order_id} berhasil.`;
          break;
        case "deny":
        case "expire":
        case "cancel":
          newStatus = "Cancelled";
          notificationMessage = `Transaksi untuk kode booking ${order_id} gagal atau dibatalkan.`;
          break;
        default:
          break;
      }

      await prisma.bookings.update({
        where: { booking_id: booking.booking_id },
        data: {
          booking_payment_status: newStatus,
          booking_payment_method: payment_type,
        },
      });
      if (
        transaction_status === "capture" ||
        transaction_status === "settlement"
      ) {
        await prisma.notifications.create({
          data: {
            user_id: booking.user_id,
            notification_type: "TRANSACTION",
            notification_message: notificationMessage,
            notification_is_read: false,
          },
        });
      }
      res.status(200).json({
        message: "Transaction status updated",
        notification_message: notificationMessage,
      });
    } catch (error) {
      console.error("Error updating payment status:", error.message);
      res.status(500).json({ error: "Failed to update transaction status" });
    }
  }
}

module.exports = PaymentController;

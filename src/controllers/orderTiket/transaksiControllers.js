require("dotenv").config();
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const FlightDataMapper = require("../flights/utils/flightMapper");
const moment = require("moment");

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
          message: "User  ID is required",
          data: [],
        });
      }

      const transaksi = await prisma.bookings.findMany({
        where: {
          user_id: userId,
        },
        include: {
          tickets: {
            include: {
              flight_seat_assigment: {
                include: {
                  flight_seat_class: {
                    include: {
                      seat_class: true,
                      flight: {
                        include: {
                          departure_airport: {
                            select: {
                              airport_city: true,
                              airport_name: true,
                            },
                          },
                          arrival_airport: {
                            select: {
                              airport_city: true,
                              airport_name: true,
                            },
                          },
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

      const flights = await prisma.flights.findMany({
        include: {
          airline: true,
          departure_airport: true,
          arrival_airport: true,
          flight_seat_classes: {
            include: {
              seat_class: true,
            },
          },
        },
      });

      // Format data transaksi
      const formattedTransaksi = transaksi.map((booking) => {
        return {
          booking_code: booking.booking_code,
          booking_payment_status: booking.booking_payment_status,
          tickets: booking.tickets.map((ticket) => {
            const seatClassType =
              ticket.flight_seat_assigment.flight_seat_class.seat_class
                .seat_class_type;

            const mappedFlights = FlightDataMapper.mapFlights(
              flights,
              seatClassType
            );

            const matchedFlight = mappedFlights.find(
              (flight) =>
                flight.flight_id ===
                ticket.flight_seat_assigment.flight_seat_class.flight_id
            );

            return {
              seat_class_type: seatClassType,
              seat_class_price:
                ticket.flight_seat_assigment.flight_seat_class.seat_class_price,
              flight_duration: matchedFlight?.flight_duration,
              departure_airport_city:
                ticket.flight_seat_assigment.flight_seat_class.flight
                  .departure_airport.airport_city,
              arrival_airport_city:
                ticket.flight_seat_assigment.flight_seat_class.flight
                  .arrival_airport.airport_city,
              departure_time: matchedFlight?.departure_time,
              departure_date: matchedFlight?.flight_details?.departure_date,
              arrival_time: matchedFlight?.arrival_time,
              arrival_date: matchedFlight?.flight_details?.arrival_date,
            };
          }),
        };
      });

      const groupedByMonth = {};
      formattedTransaksi.forEach((booking) => {
        booking.tickets.forEach((ticket) => {
          const { departure_date } = ticket;

          if (!departure_date) {
            console.error("Missing departure_date in ticket:", ticket);
            return;
          }

          // Parsing tanggal menggunakan moment
          const date = moment(departure_date, "DD MMMM YYYY", "id");
          if (!date.isValid()) {
            console.error("Invalid departure_date format:", departure_date);
            return;
          }

          // Format bulan dan tahun
          const monthYear = date.format("MMMM YYYY");

          if (!groupedByMonth[monthYear]) {
            groupedByMonth[monthYear] = [];
          }

          groupedByMonth[monthYear].push({
            booking_code: booking.booking_code,
            booking_payment_status: booking.booking_payment_status,
            ticket,
          });
        });
      });

      if (Object.keys(groupedByMonth).length === 0) {
        return res.status(404).json({
          statusCode: 404,
          status: "Failed",
          message: "No transactions found for this user",
          data: [],
        });
      }
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Successfully retrieved transactions",
        data: groupedByMonth,
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

      console.error("Error retrieving transactions:", error.message);
      res.status(500).json({
        statusCode: 500,
        status: "failed",
        message: "Terjadi kesalahan pada server",
        details: error.message,
      });
    }
  }

  static async createPayment(req, res) {
    try {
      const { bookingId } = req.body;

      const authToken = req.headers.authorization?.split(" ")[1];

      if (!authToken) {
        return res.status(401).json({
          statusCode: 401,
          status: "Failed",
          message: "Token tidak ditemukan",
          data: [],
        });
      }

      if (!bookingId) {
        return res.status(400).json({ error: "lengkapi fields" });
      }
      const booking = await prisma.bookings.findUnique({
        where: { booking_id: bookingId },
      });
      if (!booking) {
        return res.status(404).json({ error: "id booking tidak ada" });
      }

      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      console.log(decoded);
      const userId = decoded.userID;

      const user = await prisma.users.findUnique({
        where: { user_id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "user tidak ada" });
      }
      if (!user.user_name || !user.user_email || !user.user_phone) {
        return res.status(400).json({
          error:
            "Detail pengguna tidak lengkap. Nama, email, dan telepon wajib diisi",
        });
      }
      const totalPrice = calculateTotalPrice(booking);
      console.log("Total Price:", totalPrice);
      const snapPayload = {
        transaction_details: {
          order_id: booking.booking_code,
          gross_amount: totalPrice,
        },
        customer_details: {
          first_name: user.user_name,
          email: user.user_email,
          phone: user.user_phone,
        },
        item_details: [
          {
            id: booking.booking_code,
            price: totalPrice,
            quantity: 1,
            name: "Ticket Payment",
          },
        ],
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

      res.status(201).json({
        message: "Berhasil membuat pembayaran",
        token: token,
        redirect_url: redirectUrl,
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

      let newStatus;

      switch (transaction_status) {
        case "capture":
        case "settlement":
          newStatus = "Issued";
          break;
        case "deny":
        case "expire":
        case "cancel":
          newStatus = "Cancelled";
          break;
        default:
          newStatus = "Unpaid";
      }

      await prisma.bookings.update({
        where: { booking_id: booking.booking_id },
        data: {
          booking_payment_status: newStatus,
          booking_payment_method: payment_type,
        },
      });

      res.status(200).json({ message: "Transaction status updated" });
    } catch (error) {
      console.error("Error updating payment status:", error.message);
      res.status(500).json({ error: "Failed to update transaction status" });
    }
  }
}

module.exports = PaymentController;

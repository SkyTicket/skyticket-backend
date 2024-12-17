require("dotenv").config();
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const FlightDataMapper = require("../flights/utils/flightMapper");
// const moment = require("moment");
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
        const flightTicket = booking.tickets[0].flight_seat_assigment?.flight_seat_class;
      
        const passengerCategory = (category) => {
          return booking.tickets.filter((passenger) => passenger.category === category);
        };
      
        const amountDetails = {
          adults: `${passengerCategory('Adult').length} Adults`,
          adults_amount_total: Currency.format(passengerCategory('Adult').length * flightTicket.seat_class_price),
          ...(passengerCategory('Child').length > 0 && {
            children: `${passengerCategory('Child').length} Children`,
            children_amount_total: Currency.format(passengerCategory('Child').length * flightTicket.seat_class_price),
          }),
          ...(passengerCategory('Baby').length > 0 && {
            babies: `${passengerCategory('Baby').length} Babies`,
            babies_amount_total: Currency.format(passengerCategory('Baby').length * 0),
          }),
          tax: Currency.format(booking.tax),
          booking_amount_total: Currency.format(Number(booking.booking_amount)),
        };
      
        const formattedData = {
          booking_payment_status: booking.booking_payment_status,
          departure_airport_city: flightTicket.flight.departure_airport.airport_city,
          flight_duration: Moment.timeDifferenceFormatted(flightTicket.flight.flight_arrival_date, flightTicket.flight.flight_departure_date),
          arrival_airport_city: flightTicket.flight.arrival_airport.airport_city,
          booking_code: booking.booking_code,
          seat_class_type: flightTicket.seat_class.seat_class_type || "Unknown",
          booking_amount: Currency.format(booking.booking_amount),
          passangers_total: {
            adult: passengerCategory('Adult').length,
            child: passengerCategory('Child').length,
            baby: passengerCategory('Baby').length,
          },
          ticket: {
            flight_departure_airport_name: flightTicket.flight.departure_airport.airport_name || {},
            flight_arrival_airport_name: flightTicket.flight.arrival_airport.airport_name || {},
            airline_and_seat_class: `${flightTicket.flight.airline.airline_name} - ${flightTicket.seat_class.seat_class_type}`,
            flight_number: `${flightTicket.flight.airline.airline_code} - ${flightTicket.flight.flight_number}`,
            airline_logo: flightTicket.flight.airline.Airline_logo || "N/A",
            passengers: booking.tickets.map((passenger) => {
              return [
                {
                  id: passenger.passanger.passenger_id,
                  name: `${passenger.passanger.title}. ${passenger.passanger.name} ${passenger.passanger.familyName ? passenger.passanger.familyName : ""}`,
                },
              ];
            }),
            seat_class_price: {
              raw: flightTicket.seat_class_price || 0,
              formatted: Currency.format(flightTicket.seat_class_price || 0),
            },
            departure_date: DateTimeUtils.formatDateByTimezone(flightTicket.flight.flight_departure_date, flightTicket.flight.departure_airport.airport_time_zone),
            departure_time: DateTimeUtils.formatHoursByTimezone(flightTicket.flight.flight_departure_date, flightTicket.flight.departure_airport.airport_time_zone),
            arrival_date: DateTimeUtils.formatDateByTimezone(flightTicket.flight.flight_arrival_date, flightTicket.flight.arrival_airport.airport_time_zone),
            arrival_time: DateTimeUtils.formatHoursByTimezone(flightTicket.flight.flight_arrival_date, flightTicket.flight.arrival_airport.airport_time_zone),
            amount_details: amountDetails,
          },
        };
      
        // take departure date for grouping
        const departureDate = new Date(flightTicket.flight.flight_departure_date);
        const monthYearKey = `${departureDate.toLocaleString('id-ID', { month: 'long' })} ${departureDate.getFullYear()}`;
      
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
        include: {
          user: true,
          tickets: {
            include: {
              flight_seat_assigment: {
                include: {
                  flight_seat_class: {
                    include: {
                      seat_class: true, // Ensure this is included
                      flight: {
                        include: {
                          airline: true,
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
      // Ambil detail penerbangan dari tiket
      const ticket = booking.tickets[0]; // Ambil tiket pertama (asumsi satu booking satu tiket)
      const flightSeatAssignment = ticket.flight_seat_assigment;
      const flightSeatClass = flightSeatAssignment.flight_seat_class;
      const flight = flightSeatClass.flight;

      // Pemetaan data penerbangan
      const seatClass = flightSeatClass.seat_class.seat_class_type; // Ambil jenis kelas kursi
      const seatPrice = flightSeatClass.seat_class_price;
      const formattedFlightData = [
        {
          seat_class_type: seatClass,
          seat_class_price: {
            raw: seatPrice,
            formatted: seatPrice.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
          },
          departure_airport_city: flight.departure_airport.airport_city,
          departure_airport_name: flight.departure_airport.airport_name,
          arrival_airport_city: flight.arrival_airport.airport_city,
          arrival_airport_name: flight.arrival_airport.airport_name,
          departure_time: flight.flight_departure_date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          departure_date:
            flight.flight_departure_date.toLocaleDateString("id-ID"),
          arrival_time: flight.flight_arrival_date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          arrival_date: flight.flight_arrival_date.toLocaleDateString("id-ID"),
          airline_name_and_class: `${flight.airline.name} - ${seatClass}`,
          flight_number: flight.flight_number,
          airline_logo: flight.airline.logo, // Pastikan ada field logo di model Airline
          Informasi: [
            "Baggage 20 kg",
            "Cabin baggage 7 kg",
            "In-flight entertainment",
          ],
        },
      ];

      const passengerCounts = {
        adult: booking.tickets.filter((ticket) => ticket.category === "Adult")
          .length,
        child: booking.tickets.filter((ticket) => ticket.category === "Child")
          .length,
        baby: booking.tickets.filter((ticket) => ticket.category === "Baby")
          .length,
      };
      const subTotalPrice = {
        adult: passengerCounts.adult * seatPrice,
        child: passengerCounts.child * seatPrice,
        baby: passengerCounts.baby * seatPrice,
      };
      const totalPrice =
        subTotalPrice.adult + subTotalPrice.child + subTotalPrice.baby;
      const tax = 0.11 * totalPrice; // Misalkan pajak 11%
      const total = totalPrice + tax;

      const itemDetails = booking.tickets.map((ticket) => {
        const flightSeatAssignment = ticket.flight_seat_assigment;
        const flightSeatClass = flightSeatAssignment.flight_seat_class;
        const flight = flightSeatClass.flight;

        return {
          id: ticket.ticket_id,
          price: flightSeatClass.seat_class_price,
          quantity: 1,
          name: `${flight.flight_number} - ${flight.airline.name} (${flightSeatClass.seat_class.seat_class_type})`,
        };
      });
      // const totalPrice = calculateTotalPrice(booking);
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
        item_details: itemDetails,
        // Menambahkan detail penerbangan ke dalam payload
        formattedFlightData, // Pastikan ini ada
        subTotalPrice, // Pastikan ini ada
        tax, // Pastikan ini ada
        total, // Pastikan ini ada
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

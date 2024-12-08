require("dotenv").config();
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MIDTRANS_API_URL =
  "https://app.sandbox.midtrans.com/snap/v1/transactions";
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

class PaymentController {
  static async showTransaksi(req, res) {
    try {
      const transaksi = await prisma.bookings.findMany();
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Berhasil menampilkan list transaksi",
        data: transaksi,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Server error", details: error.message });
    }
  }
  static async showTransaksiByIdUser(req, res) {
    const { userId } = req.params;

    try {
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const transaksi = await prisma.bookings.findMany({
        where: {
          user_id: userId,
        },
        include: {
          tickets: true,
        },
      });

      if (transaksi.length === 0) {
        return res
          .status(404)
          .json({ error: "No transactions found for this user" });
      }
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Successfully retrieved transactions",
        data: transaksi,
      });
    } catch (error) {
      // Menangani error yang lebih spesifik dan logging
      console.error("Error retrieving transactions:", error.message);
      res.status(500).json({ error: "Server error" });
    }
  }

  //getbyid

  static async createPayment(req, res) {
    try {
      const { bookingId, totalPrice, userId } = req.body;
      if (!bookingId || !totalPrice || !userId) {
        return res.status(400).json({ error: "lengkapi fields" });
      }
      const booking = await prisma.bookings.findUnique({
        where: { booking_id: bookingId },
      });
      if (!booking) {
        return res.status(404).json({ error: "id booking tidak ada" });
      }
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
      await prisma.bookings.update({
        where: { booking_id: bookingId },
        data: {
          booking_payment_status: "Unpaid",
          booking_payment_method: "Midtrans",
        },
      });

      res.status(201).json({
        message: "Berhasil membuat pembayaran",
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
        .json({ error: "Gagal membuat pembayaran", message: error.message });
    }
  }

  static async paymentNotification(req, res) {
    const { order_id, transaction_status, payment_type } = req.body;

    try {
      const booking = await prisma.bookings.findUnique({
        where: { booking_id: order_id },
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
          newStatus = "Pending";
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

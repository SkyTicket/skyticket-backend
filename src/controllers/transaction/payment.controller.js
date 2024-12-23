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

class PaymentController {
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

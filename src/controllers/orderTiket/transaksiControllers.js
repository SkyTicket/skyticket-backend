const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MIDTRANS_API_URL =
  "https://app.sandbox.midtrans.com/snap/v1/transactions";
const MIDTRANS_SERVER_KEY = "SB-Mid-server-zGyELu5cNq66AH9QyJxGHVAl";

class PaymentController {
  static async createPayment(req, res) {
    const { bookingId, totalPrice, userId } = req.body;

    const booking = await prisma.bookings.findUnique({
      where: { booking_id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const user = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.user_name || !user.user_email || !user.user_phone) {
      return res.status(400).json({
        error:
          "User details are incomplete. Name, email, and phone are required.",
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

    try {
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

      res.status(200).json({
        message: "Payment created successfully",
        redirect_url: redirectUrl,
      });
    } catch (error) {
      console.error("Error creating payment:", error.message);
      res.status(500).json({ error: "Error creating payment" });
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

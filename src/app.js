const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const app = express();
app.use(express.json());

const MIDTRANS_SERVER_KEY = "SB-Mid-server-zGyELu5cNq66AH9QyJxGHVAl";
const MIDTRANS_API_URL =
  "https://app.sandbox.midtrans.com/snap/v1/transactions";

app.post("/api/tickets/select", async (req, res) => {
  const { userId, ticketId, passengerData, seatNumber } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!user || !ticket) {
      return res.status(404).json({ message: "User or Ticket not found" });
    }

    const seat = await prisma.seat.findFirst({
      where: { seat_number: seatNumber, ticket_id: ticketId },
    });

    if (!seat || !seat.available) {
      return res.status(400).json({ message: "Seat not available" });
    }

    // Save passenger data
    const newPassenger = await prisma.passenger.create({
      data: {
        user_id: userId,
        name: passengerData.name,
        passport_no: passengerData.passport_no,
        nationality: passengerData.nationality,
        ticket_id: ticketId,
      },
    });

    // Mark seat as unavailable
    await prisma.seat.update({
      where: { id: seat.id },
      data: { available: false },
    });

    res.status(200).json({
      message: "Ticket selected and passenger data saved",
      passenger: newPassenger,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Failed to select ticket and save passenger data" });
  }
});

app.post("/api/transactions", async (req, res) => {
  const { userId, ticketId, amount } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!user || !ticket) {
      return res.status(404).json({ message: "User or Ticket not found" });
    }

    const orderId = `ORDER-${Date.now()}`;
    const itemDetails = [
      {
        id: ticket.id,
        price: ticket.price,
        quantity: 1,
        name: ticket.flight_code,
      },
    ];

    const totalAmount = itemDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const midtransResponse = await axios.post(
      MIDTRANS_API_URL,
      {
        transaction_details: {
          order_id: orderId,
          gross_amount: totalAmount,
        },
        customer_details: {
          first_name: user.username,
          email: user.email,
        },
        item_details: itemDetails,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${MIDTRANS_SERVER_KEY}:`
          ).toString("base64")}`,
        },
      }
    );

    const { token, redirect_url } = midtransResponse.data;

    const newTransaction = await prisma.transaction.create({
      data: {
        user_id: userId,
        ticket_id: ticketId,
        amount: amount,
        payment_status: "PENDING",
        payment_method: "Midtrans Snap",
        transaction_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    res.status(201).json({
      message: "Transaction created",
      transaction: newTransaction,
      token,
      redirect_url,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res
      .status(500)
      .json({ message: "Failed to create transaction", error: error.message });
  }
});

app.post("/api/transactions", async (req, res) => {
  const { userId, ticketId, amount } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!user || !ticket) {
      return res.status(404).json({ message: "User or Ticket not found" });
    }

    const orderId = `ORDER-${Date.now()}`;
    const itemDetails = [
      {
        id: ticket.id,
        price: ticket.price,
        quantity: 1,
        name: ticket.flight_code, // Bisa menggunakan kode penerbangan
      },
    ];

    const totalAmount = itemDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const midtransResponse = await axios.post(
      MIDTRANS_API_URL,
      {
        transaction_details: {
          order_id: orderId,
          gross_amount: totalAmount,
        },
        customer_details: {
          first_name: user.username,
          email: user.email,
        },
        item_details: itemDetails,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${MIDTRANS_SERVER_KEY}:`
          ).toString("base64")}`,
        },
      }
    );

    const { token, redirect_url } = midtransResponse.data;

    const newTransaction = await prisma.transaction.create({
      data: {
        user_id: userId,
        ticket_id: ticketId,
        amount: amount,
        payment_status: "PENDING",
        payment_method: "Midtrans Snap",
        transaction_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    res.status(201).json({
      message: "Transaction created",
      transaction: newTransaction,
      token,
      redirect_url,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res
      .status(500)
      .json({ message: "Failed to create transaction", error: error.message });
  }
});

app.post("/api/transactions/webhook", async (req, res) => {
  const { order_id, transaction_status } = req.body;

  try {
    const updatedStatus =
      transaction_status === "capture" || transaction_status === "settlement"
        ? "SUCCESS"
        : transaction_status === "deny" ||
          transaction_status === "expire" ||
          transaction_status === "cancel"
        ? "FAILED"
        : "PENDING";

    await prisma.transaction.update({
      where: { order_id },
      data: { payment_status: updatedStatus },
    });

    res.status(200).json({ message: "Transaction status updated" });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: "Failed to update transaction status" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

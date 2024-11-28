const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.handlePaymentStatus = async (req, res) => {
  const { order_id, transaction_status } = req.body;

  try {
    const paymentStatus =
      transaction_status === "capture" || transaction_status === "settlement"
        ? "COMPLETED"
        : transaction_status === "deny" ||
          transaction_status === "expire" ||
          transaction_status === "cancel"
        ? "FAILED"
        : "PENDING";

    await prisma.bookings.update({
      where: { booking_id: order_id },
      data: { booking_payment_status: paymentStatus },
    });

    res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({
        message: "Failed to update payment status",
        error: error.message,
      });
  }
};

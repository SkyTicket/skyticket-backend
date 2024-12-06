const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const prisma = new PrismaClient();
const response = require("./utils/response");

class TicketController {
  static getCategoryByAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 2) {
      return "Infant";
    } else if (age >= 2 && age < 18) {
      return "Child";
    } else {
      return "Adult";
    }
  }

  static async createTicketOrder(req, res) {
    const { seats, passengers, userId, bookerName, bookerEmail, bookerPhone } =
      req.body;

    if (
      !seats ||
      !passengers ||
      seats.length === 0 ||
      passengers.length === 0
    ) {
      return response(
        400,
        "failed",
        null,
        "Seats and passengers data are required.",
        res
      );
    }

    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 1);

    const bookingCode = crypto.randomBytes(4).toString("hex");

    const seatData = await prisma.flight_seat_assignments.findMany({
      where: {
        id: { in: seats.map((seat) => seat.id) },
      },
      select: {
        price: true,
      },
    });

    if (seatData.length !== seats.length) {
      return response(
        400,
        "failed",
        null,
        "Some seats are invalid or not found.",
        res
      );
    }

    const totalPrice = seatData.reduce(
      (total, seat) => total + parseInt(seat.price),
      0
    );

    const tax = 0.11 * totalPrice;

    const transaction = await prisma.bookings.create({
      data: {
        booking_code: bookingCode,
        tax: tax,
        booking_amount: totalPrice + tax,
        booking_payment_status: "Unpaid",
        booking_payment_method: "Credit Card",
      },
    });

    const user = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const bookerData = {
      user_id: userId,
      booker_name: bookerName,
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
    };

    const booker = await prisma.bookers.create({
      data: bookerData,
    });

    const passengerData = passengers.map((passenger) => {
      const category = TicketController.getCategoryByAge(passenger.dateOfBirth);
      return {
        title: passenger.title,
        name: passenger.name,
        familyName: passenger.familyName || null,
        dateOfBirth: new Date(passenger.dateOfBirth),
        nationality: passenger.nationality,
        identityNumber: passenger.identityNumber,
        issuingCountry: passenger.issuingCountry,
        validUntil: passenger.validUntil
          ? new Date(passenger.validUntil)
          : null,
        category: category,
        bookers_id: booker.booker_id,
      };
    });

    const createdPassengers = await prisma.passengers.createMany({
      data: passengerData,
    });

    const passengerIds = await prisma.passengers.findMany({
      where: { name: { in: passengers.map((p) => p.name) } },
      select: { passenger_id: true },
    });

    const validSeats = await prisma.flight_seat_assignments.findMany({
      where: {
        id: { in: seats.map((seat) => seat.id) },
      },
    });

    if (validSeats.length !== seats.length) {
      return res
        .status(400)
        .json({ error: "Some seats are invalid or not found" });
    }

    const ticketData = seats.map((seat, index) => ({
      booking_id: transaction.booking_id,
      flight_seat_assigment_id: seat.id,
      passenger_id: passengerIds[index].passenger_id,
      category: passengerData[index].category,
    }));

    await prisma.tickets.createMany({
      data: ticketData,
    });

    await prisma.flight_seat_assignments.updateMany({
      where: { id: { in: seats.map((seat) => seat.id) } },
      data: { available: false },
    });

    response(200, "success", bookingCode, "Tickets successfully created", res);
  }
}

module.exports = TicketController;

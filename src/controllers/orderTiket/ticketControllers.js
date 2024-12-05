const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const prisma = new PrismaClient();
const response = require("./utils/response");

class TicketController {
  // Fungsi untuk membuat order tiket
  static async createTicketOrder(req, res) {
    const {
      seats,
      passengers,
      totalPrice,
      userId,
      bookerName,
      bookerEmail,
      bookerPhone,
    } = req.body;

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

    // Membuat booking code
    const bookingCode = crypto.randomBytes(4).toString("hex");

    // Menghitung tax
    const tax = 0.11 * parseInt(totalPrice);

    // Membuat transaksi
    const transaction = await prisma.bookings.create({
      data: {
        booking_code: bookingCode,
        tax: tax,
        booking_amount: parseInt(totalPrice) + tax,
        booking_payment_status: "Unpaid", // Status pembayaran
        booking_payment_method: "Credit Card", // Metode pembayaran
      },
    });

    // Mencari user
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Membuat objek booker terpisah
    const bookerData = {
      user_id: userId,
      booker_name: bookerName,
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
    };

    // Menambahkan data booker
    const booker = await prisma.bookers.create({
      data: bookerData,
    });

    // Menambahkan data penumpang
    const passengerData = passengers.map((passenger) => ({
      title: passenger.title,
      name: passenger.name,
      familyName: passenger.familyName || null,
      dateOfBirth: new Date(passenger.dateOfBirth),
      nationality: passenger.nationality,
      identityNumber: passenger.identityNumber,
      issuingCountry: passenger.issuingCountry,
      validUntil: passenger.validUntil ? new Date(passenger.validUntil) : null,
      bookers_id: booker.booker_id, // Relasi ke booker
    }));

    // Menyimpan data penumpang ke database
    const createdPassengers = await prisma.passengers.createMany({
      data: passengerData,
    });

    // Mengambil ID penumpang yang baru saja dibuat
    const passengerIds = await prisma.passengers.findMany({
      where: { name: { in: passengers.map((p) => p.name) } },
      select: { passenger_id: true },
    });

    // Mengecek seat yang valid
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

    // Menambahkan tiket untuk setiap seat dan passenger
    const ticketData = seats.map((seat, index) => ({
      booking_id: transaction.booking_id,
      flight_seat_assigment_id: seat.id,
      passenger_id: passengerIds[index].passenger_id,
      category: passengers[index].category,
    }));

    // Membuat tiket di database
    await prisma.tickets.createMany({
      data: ticketData,
    });

    // Update status seat menjadi tidak tersedia
    await prisma.flight_seat_assignments.updateMany({
      where: { id: { in: seats.map((seat) => seat.id) } },
      data: { available: false },
    });

    // Kirimkan response sukses
    response(200, "success", bookingCode, "Tickets successfully created", res);
  }
}

module.exports = TicketController;

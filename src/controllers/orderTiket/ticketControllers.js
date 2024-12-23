require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const prisma = new PrismaClient();

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
    } else if (age >= 2 && age < 12) {
      return "Child";
    } else {
      return "Adult";
    }
  }

  static async createTicketOrder(req, res) {
    const { seats, passengers, bookerName, bookerEmail, bookerPhone } =
      req.body;

    const userId = req.user.user_id;
    if (!userId) {
      throw {
        statusCode: 401,
        status: "Failed",
        message: "UserID tidak ditemukan dalam token.",
      };
    }

    if (
      !seats ||
      !passengers ||
      seats.length === 0 ||
      passengers.length === 0
    ) {
      return res.status(400).json({
        statusCode: 400,
        status: "Failed",
        message: "data kursi dan penumpang wajib ada",
        data: [],
      });
    }

    const bookingCode = crypto.randomBytes(4).toString("hex");
    try {
      //memastikan hanya 1 transaksi
      const transaction = await prisma.$transaction(async (prisma) => {
        const seatData = await prisma.flight_seat_assignments.findMany({
          where: {
            id: { in: seats.map((seat) => parseInt(seat.id, 10)) },
            available: true,
          },
          select: {
            id: true,
            seat_id: true,
            available: true,
            flight_seat_class: {
              select: {
                seat_class_price: true,
              },
            },
          },
        });

        if (seatData.length !== seats.length) {
          throw {
            statusCode: 400,
            status: "Failed",
            message: "Beberapa kursi tidak valid atau tidak tersedia",
          };
        }

        const categorySubtotals = {
          adult: 0,
          child: 0,
          Infant: 0,
        };

        seatData.forEach((seat, index) => {
          const passengerCategory = TicketController.getCategoryByAge(
            passengers[index].dateOfBirth
          );
          const seatPrice = parseInt(
            seat.flight_seat_class.seat_class_price,
            10
          );
          if (passengerCategory === "Adult") {
            categorySubtotals.adult += seatPrice;
          } else if (passengerCategory === "Child") {
            categorySubtotals.child += seatPrice;
          } else if (passengerCategory === "Infant") {
            categorySubtotals.baby += 0;
          }
        });

        const totalPrice = categorySubtotals.adult + categorySubtotals.child;
        const tax = 0.11 * totalPrice;
        const totalAmount = totalPrice + tax;

        const transaction = await prisma.bookings.create({
          data: {
            booking_code: bookingCode,
            tax: tax,
            booking_amount: totalPrice + tax,
            booking_payment_status: "Unpaid",
            booking_payment_method: "Credit Card",
            user: {
              connect: {
                user_id: userId,
              },
            },
          },
        });

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
          const category = TicketController.getCategoryByAge(
            passenger.dateOfBirth
          );
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

        await prisma.passengers.createMany({
          data: passengerData,
        });

        const passengerIds = await prisma.passengers.findMany({
          where: { bookers_id: booker.booker_id },
          select: { passenger_id: true },
        });

        if (seats.length !== passengers.length) {
          throw {
            statusCode: 400,
            status: "Failed",
            message: "Jumlah kursi harus sama dengan jumlah penumpang",
          };
        }

        const ticketData = seats.map((seat, index) => ({
          booking_id: transaction.booking_id,
          flight_seat_assigment_id: seat.id,
          passenger_id: passengerIds[index].passenger_id,
          category: passengerData[index].category,
        }));

        // Update status kursi dengan optimistik locking
        const updateResults = await prisma.flight_seat_assignments.updateMany({
          where: {
            id: { in: seats.map((seat) => seat.id) },
            available: true,
          },
          data: { available: false },
        });

        if (updateResults.count !== seats.length) {
          throw {
            statusCode: 400,
            status: "Failed",
            message: "Beberapa kursi sudah tidak tersedia, pemesanan gagal",
          };
        }

        await prisma.tickets.createMany({
          data: ticketData,
        });

        return {
          statusCode: 200,
          status: "Success",
          message: "Berhasil membuat Tiket",
          data: ticketData,
          bookingCode,
          subtotal: categorySubtotals,
          tax,
          total: totalAmount,
        };
      });

      return res.status(transaction.statusCode).json(transaction);
    } 
    catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.message || "Terjadi kesalahan saat pada server";
      return res.status(statusCode).json({
        statusCode,
        status: "Failed",
        message,
        data: [],
      });
    }
  }
}

module.exports = TicketController;

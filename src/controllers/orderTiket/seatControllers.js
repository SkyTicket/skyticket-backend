const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../utils/response");

class SeatController {
  static async getDetailFlight(req, res) {
    try {
      const { flightId, seatClass, adult, child, baby } = req.query;

      // Mengambil data kursi dari Flight_seat_assignments yang menghubungkan Seat dan Flight_seat_classes
      const seatAssignments = await prisma.flight_seat_assignments.findMany({
        where: {
          flight_seat_class: {
            flight_id: flightId, // Filter berdasarkan flightId
          },
        },
        include: {
          seat: true, // Menyertakan data Seat yang terhubung
          flight_seat_class: {
            include: {
              flight: true, // Menyertakan informasi penerbangan
              seat_class: true, // Menyertakan informasi kelas kursi
            },
          },
        },
      });

      if (!seatAssignments || seatAssignments.length === 0) {
        response(
          404,
          "error",
          null,
          "Tidak ada kursi yang tersedia untuk penerbangan ini",
          res
        );
        return;
      }

      // Filter seat berdasarkan kelas jika ada
      const filteredAssignments = seatClass
        ? seatAssignments.filter(
            (assignment) =>
              assignment.flight_seat_class.seat_class.seat_class_type ===
              seatClass
          )
        : seatAssignments;

      if (!filteredAssignments || filteredAssignments.length === 0) {
        response(
          404,
          "error",
          null,
          "Tidak ada kursi yang cocok dengan kelas yang diminta",
          res
        );
        return;
      }

      const passengerCounts = {
        adult: parseInt(adult) || 0,
        child: parseInt(child) || 0,
        baby: parseInt(baby) || 0,
      };

      const seatPrice =
        filteredAssignments.length > 0
          ? filteredAssignments[0].price // Menggunakan harga yang ada pada Flight_seat_assignments
          : 0;

      const subTotalPrice = {
        adult: passengerCounts.adult * seatPrice,
        child: passengerCounts.child * (seatPrice * 0.75),
        baby: passengerCounts.baby * 0,
      };

      const totalPrice =
        subTotalPrice.adult + subTotalPrice.child + subTotalPrice.baby;

      const tax = 0.11 * parseInt(totalPrice);

      const total = totalPrice + tax;

      const datas = {
        seats: filteredAssignments,
        passengerCounts,
        subTotalPrice,
        tax,
        total,
      };

      response(
        200,
        "success",
        datas,
        "Berhasil menampilkan Checkout Bio data",
        res
      );
    } catch (error) {
      console.error(error);
      response(500, "error", null, "Terjadi kesalahan pada server", res);
    }
  }
}

module.exports = SeatController;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class SeatController {
  static async getDetailFlight(req, res) {
    try {
      const { flightId, seatClass, adult, child, baby } = req.query;

      // Validasi input
      if (
        !flightId ||
        !seatClass ||
        isNaN(adult) ||
        isNaN(child) ||
        isNaN(baby)
      ) {
        return res.status(400).json({
          statusCode: 400,
          status: "Failed",
          message: "Parameter yang diberikan tidak valid.",
          data: [],
        });
      }

      // Mencari data kelas kursi penerbangan
      const flightClass = await prisma.flight_seat_classes.findFirst({
        where: {
          flight_id: flightId,
          seat_class: {
            seat_class_type: seatClass,
          },
        },
        include: {
          flight: true,
          seat_class: true,
        },
      });

      // Jika kelas kursi tidak ditemukan
      if (!flightClass) {
        return res.status(404).json({
          statusCode: 404,
          status: "Failed",
          message: "Tidak ditemukan kelas kursi untuk penerbangan ini.",
          data: [],
        });
      }

      // Mencari data seat assignments
      const seatAssignments = await prisma.flight_seat_assignments.findMany({
        where: {
          flight_seat_class: {
            flight_seat_class_id: flightClass.flight_seat_class_id,
          },
        },
        include: {
          seat: true,
        },
      });

      // Jika tidak ada seat assignments
      if (!seatAssignments || seatAssignments.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          status: "Failed",
          message: "Tidak ditemukan kursi untuk penerbangan ini.",
          data: [],
        });
      }

      const passengerCounts = {
        adult: parseInt(adult) || 0,
        child: parseInt(child) || 0,
        baby: parseInt(baby) || 0,
      };

      // Menentukan harga kursi (menggunakan harga kursi pertama sebagai contoh)
      const seatPrice =
        seatAssignments.length > 0 ? parseFloat(seatAssignments[0].price) : 0;

      // Menghitung harga total untuk penumpang
      const subTotalPrice = {
        adult: passengerCounts.adult * seatPrice,
        child: passengerCounts.child * seatPrice,
        baby: passengerCounts.baby * seatPrice,
      };
      const totalPrice =
        subTotalPrice.adult + subTotalPrice.child + subTotalPrice.baby;

      const tax = 0.11 * parseInt(totalPrice);
      const total = totalPrice + tax;

      // Menghitung waktu mulai
      const startTime = Date.now();

      // Fungsi untuk memeriksa apakah waktu habis
      const checkTimeout = () => {
        if (Date.now() - startTime > 60000) {
          // 1 menit = 60000 ms
          return true;
        }
        return false;
      };

      // Menunda respons selama 1 menit atau hingga waktu habis
      setTimeout(() => {
        if (checkTimeout()) {
          return res.status(408).json({
            statusCode: 408,
            status: "Failed",
            message: "Waktu habis",
            data: [],
          });
        } else {
          return res.status(200).json({
            statusCode: 200,
            status: "Success",
            message: "Data berhasil diambil.",
            data: seatAssignments,
          });
        }
      }, 60000); // Tunggu selama 1 menit

      // Menampilkan hasil ke pengguna
      return res.status(200).json({
        statusCode: 200,
        status: "Success",
        message: "Detail penerbangan berhasil ditemukan.",
        data: {
          flightClass,
          seatAssignments,
          subTotalPrice,
          tax,
          total,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        status: "Failed",
        message: "Terjadi kesalahan pada server.",
        data: [],
      });
    }
  }
}

module.exports = SeatController;

const { PrismaClient } = require("@prisma/client");
const FlightDataMapper = require("../flights/utils/flightMapper");
const prisma = new PrismaClient();
class SeatController {
  static async getDetailFlight(req, res) {
    try {
      const { flightId, seatClass, adult, child, baby } = req.query;
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

      const flight = await prisma.flights.findUnique({
        where: { flight_id: flightId },
        include: {
          airline: true,
          departure_airport: {
            select: {
              airport_city: true,
              airport_name: true,
              airport_time_zone: true,
            },
          },
          arrival_airport: {
            select: {
              airport_city: true,
              airport_name: true,
              airport_time_zone: true,
            },
          },
          flight_seat_classes: {
            include: {
              seat_class: true,
            },
          },
        },
      });
      flight.flight_seat_classes.filter(
        (seatClass) => seatClass.seat_class.seat_class_id === seatClass
      );

      const mappedFlight = FlightDataMapper.mapFlights([flight], seatClass)[0];

      if (!mappedFlight || !flight) {
        return res.status(404).json({
          statusCode: 404,
          status: "Failed",
          message:
            "Tidak ditemukan penerbangan yang cocok untuk kelas kursi ini.",
          data: [],
        });
      }

      const formattedFlightData = [
        {
          seat_class_type: seatClass,
          seat_class_price: {
            raw: mappedFlight.seat_class_price.raw,
            formatted: mappedFlight.seat_class_price.formatted,
          },
          departure_airport_city: flight.departure_airport.airport_city,
          departure_airport_name: flight.departure_airport.airport_name,
          arrival_airport_city: flight.arrival_airport.airport_city,
          arrival_airport_name: flight.arrival_airport.airport_name,
          departure_time: mappedFlight.flight_details.departure_time,
          departure_date: mappedFlight.flight_details.departure_date,
          arrival_time: mappedFlight.flight_details.arrival_time,
          arrival_date: mappedFlight.flight_details.arrival_date,
          airline_name_and_class:
            mappedFlight.flight_details.airline_name_and_class,
          flight_number: mappedFlight.flight_details.flight_number,
          airline_logo: mappedFlight.flight_details.airline_logo,
          Informasi: [
            "Baggage 20 kg",
            "Cabin baggage 7 kg",
            "In-flight entertainment",
          ],
        },
      ];

      const seatPrice = flight.flight_seat_classes[0].seat_class_price;
      const passengerCounts = {
        adult: parseInt(adult) || 0,
        child: parseInt(child) || 0,
        baby: parseInt(baby) || 0,
      };
      const subTotalPrice = {
        adult: passengerCounts.adult * seatPrice,
        child: passengerCounts.child * seatPrice,
        baby: passengerCounts.baby * seatPrice * 0,
      };
      const totalPrice =
        subTotalPrice.adult + subTotalPrice.child + subTotalPrice.baby;
      const tax = 0.11 * parseInt(totalPrice);
      const total = totalPrice + tax;

      const seatAssignments = await prisma.flight_seat_assignments.findMany({
        where: {
          flight_seat_class: {
            flight: {
              flight_id: flightId,
            },
          },
        },
        orderBy: {
          seat_id: "asc",
        },
        include: {
          seat: true,
        },
      });
      return res.status(200).json({
        statusCode: 200,
        status: "Success",
        message: "Detail penerbangan berhasil ditemukan.",
        data: {
          formattedFlightData,
          subTotalPrice,
          tax,
          total,
          seatAssignments,
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

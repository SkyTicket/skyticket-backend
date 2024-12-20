const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function countBookedSeats(flightIds) {
  let bookedSeatsOnFlightsBySeatClassCount = [];

  for (let i = 0; i <= flightIds.length - 1; i++) {
    const bookedSeats = await prisma.flight_seat_assignments.count({
      where: {
        AND: [
          {
            flight_seat_class: {
              flight_id: flightIds[i]
            }
          },
          {
            available: false
          }
        ]
      },
    });

    bookedSeatsOnFlightsBySeatClassCount.push(bookedSeats);
  }

  return bookedSeatsOnFlightsBySeatClassCount;
}

module.exports = countBookedSeats;

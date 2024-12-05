const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function countBookedSeats(flightIds) {
  let bookedSeatsOnFlightsBySeatClassCount = [];

  for (let i = 0; i <= flightIds.length - 1; i++) {
    const tickets = await prisma.tickets.count({
      where: {
        flight_seat_assigment: {
          flight_seat_class: {
            flight: {
              flight_id: flightIds[i], 
            },
          },
        },
      },
    });

    bookedSeatsOnFlightsBySeatClassCount.push(tickets);
  }

  return bookedSeatsOnFlightsBySeatClassCount;
}

module.exports = countBookedSeats;

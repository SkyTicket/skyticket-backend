const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DateTimeUtils = require('../../../libs/datetime');
const Luxon = require('../../../libs/luxon');

async function countBookedSeats(flightIds){
    let bookedSeatsOnFlightsBySeatClassCount = []

    for(let i = 0; i <= flightIds.length-1; i++){
        const tickets = await prisma.tickets.count({
            where: {
                AND: [
                    {
                        flight: {
                            flight_seat_classes: {
                                some: {
                                    flight_id: flightIds[i]
                                }
                            }
                        }
                    },
                    {
                        ticket_status: 'BOOKED'
                    }
                ]
            },
        })

        bookedSeatsOnFlightsBySeatClassCount.push(tickets)

    }
    
    return bookedSeatsOnFlightsBySeatClassCount;
}

module.exports = countBookedSeats;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DateTimeUtils = require('../../libs/datetime');
const Luxon = require('../../libs/luxon');

async function getSeatCapacity(flightSeatClassId){
    const seatClassCapacity = await prisma.flight_seat_classes.findMany(({
        where: {
            flight_seat_class_id: flightSeatClassId
        },
        select: {
            seat_class_capacity: true
        }
    }))
    
    return seatClassCapacity.map((flightSeatClass) => {
        return flightSeatClass.seat_class_capacity
    })
}

module.exports = getSeatCapacity;
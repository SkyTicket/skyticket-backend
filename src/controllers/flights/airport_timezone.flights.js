const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DateTimeUtils = require('../../libs/datetime');
const Luxon = require('../../libs/luxon');

async function getAirportTimezone(departure_airport, arrival_airport, flight_departure_date, returning_flight_departure_date){
    const departureAirportTz = await prisma.airports.findFirst(({
        where: {
            airport_code: departure_airport
        },
        select: {
            airport_time_zone: true
        }
    }))

    const returningDepartureAirportTz = await prisma.airports.findFirst(({
        where: {
            airport_code: arrival_airport
        },
        select: {
            airport_time_zone: true
        }
    }))

    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Asia/Jakarta, Asia/Kuala_Lumpur, etc...
    const systemTzOffset = Luxon.getTimezoneOffset(localTimezone); // timezone offset in hours
    const departureAirportTzOffset = Luxon.getTimezoneOffset(departureAirportTz.airport_time_zone); // timezone offset in hours
    const returningDepartureAirportTzOffset = Luxon.getTimezoneOffset(returningDepartureAirportTz.airport_time_zone); // timezone offset in hours

    let pickedReturningDepartureDate;
    let pickedDepartureDate = DateTimeUtils.modifyHours(flight_departure_date, systemTzOffset, -departureAirportTzOffset)
    pickedReturningDepartureDate = DateTimeUtils.modifyHours(returning_flight_departure_date, systemTzOffset, -returningDepartureAirportTzOffset)
            
    // if no returning_flight_departure_date provided
    if(!returning_flight_departure_date){
        pickedReturningDepartureDate = '1111-11-11 00:00:00'
    }
    // // let pickedReturningDepartureDate;
    // let pickedReturningDepartureDate = DateTimeUtils.modifyHours(returning_flight_departure_date, systemTzOffset, -returningDepartureAirportTzOffset)
    // let pickedDepartureDate = DateTimeUtils.modifyHours(flight_departure_date, systemTzOffset, -departureAirportTzOffset)

    return {
        pickedDepartureDate: pickedDepartureDate,
        pickedReturningDepartureDate: pickedReturningDepartureDate,
        departureAirportTz: departureAirportTz,
        returningDepartureAirportTz: returningDepartureAirportTz
    }
}

module.exports = getAirportTimezone;
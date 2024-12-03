const BookedTicketCount = require('../services/ticket_count.flights');

async function flightSeatChecker(mappedFlights, adultPassengersTotal, childPassengersTotal){
    // TICKET COUNTING
    const bookedTicketsFlightIds = mappedFlights.map((mappedFlights) => {
        return mappedFlights.flight_id
    })

    const bookedSeatsPerFlight = await BookedTicketCount(bookedTicketsFlightIds)

    const getSeatCapacity = mappedFlights.map((flight) => {
        return flight.flight_seat_class_capacity
    })

    const flightSeatCapacities = getSeatCapacity

    let fullFlightsStatus = [];
    let isFlightFull;
    for(let i = 0; i <= bookedSeatsPerFlight.length - 1; i++){
        if(bookedSeatsPerFlight[i] + adultPassengersTotal + childPassengersTotal < getSeatCapacity[i]){
            isFlightFull = false
        } else if(bookedSeatsPerFlight[i] + adultPassengersTotal + childPassengersTotal > getSeatCapacity[i]){
            isFlightFull = true
        } else {
            isFlightFull = false
        }
        fullFlightsStatus.push(isFlightFull)
    }

    let filteredFlightsStatus = fullFlightsStatus
    // END OF TICKET COUNTING

    // delete flight data (mappedFlights' element) that have not enough seats
    for(let i = 0; i <= filteredFlightsStatus.length - 1; i++){
        if(filteredFlightsStatus[i] === true){
            mappedFlights.forEach((flight, index) => {
                flight.flight_seat_is_full = filteredFlightsStatus[index]
            })
        }
        else if(filteredFlightsStatus[i] === false){
            mappedFlights.forEach((flight, index) => {
                flight.flight_seat_is_full = filteredFlightsStatus[index]
            })
        }
    } 

    return {
        bookedTicketsFlightIds: bookedTicketsFlightIds,
        bookedSeatsPerFlight: bookedSeatsPerFlight,
        flightSeatCapacities: flightSeatCapacities,
        filteredFlightsStatus: filteredFlightsStatus
    }
}

module.exports = flightSeatChecker;
const DateTimeUtils = require('../../../libs/datetime');
const Moment = require('../../../libs/moment');
const Currency = require('../../../libs/currency');

class FlightDataMapper {
    static mapFlights(flights, seatClassType){
        return flights.map((flight) => {
            const findBySeatClassType = flight.flight_seat_classes.find(flightSeatClass => {
                return flightSeatClass.seat_class.seat_class_type === seatClassType
            })
            
            return {
                flight_id: flight.flight_id, // for count tickets handling
                flight_seat_class_capacity: findBySeatClassType.seat_class_capacity, // for count tickets handling
                airline_logo: flight.airline.Airline_logo,
                airline_name_and_class: `${flight.airline.airline_name} - ${findBySeatClassType.seat_class.seat_class_type}`,
                seat_class_price: {
                    raw: Number(findBySeatClassType.seat_class_price),
                    formatted: Currency.format(findBySeatClassType.seat_class_price),
                },
                departure_airport: flight.departure_airport.airport_code,
                departure_time: DateTimeUtils.formatHoursByTimezone(flight.flight_departure_date, flight.departure_airport.airport_time_zone),
                flight_duration: {
                    raw: Moment.timeDifferenceInMin(flight.flight_arrival_date, flight.flight_departure_date),
                    formatted: Moment.timeDifferenceFormatted(flight.flight_arrival_date, flight.flight_departure_date),
                }, 
                arrival_airport: flight.arrival_airport.airport_code,
                arrival_time: DateTimeUtils.formatHoursByTimezone(flight.flight_arrival_date, flight.arrival_airport.airport_time_zone),
                flight_details: {
                    departure_time: DateTimeUtils.formatHoursByTimezone(flight.flight_departure_date, flight.departure_airport.airport_time_zone),
                    departure_date: DateTimeUtils.formatDateByTimezone(flight.flight_departure_date, flight.departure_airport.airport_time_zone),
                    departure_airport_name: flight.departure_airport.airport_name,
                    airline_name_and_class: `${flight.airline.airline_name} - ${findBySeatClassType.seat_class.seat_class_type}`,
                    flight_number: `${flight.airline.airline_code} - ${flight.flight_number}`,
                    airline_logo: flight.airline.Airline_logo,
                    arrival_time: DateTimeUtils.formatHoursByTimezone(flight.flight_arrival_date, flight.arrival_airport.airport_time_zone),
                    arrival_date: DateTimeUtils.formatDateByTimezone(flight.flight_arrival_date, flight.arrival_airport.airport_time_zone),
                    arrival_airport_name: flight.arrival_airport.airport_name,
                    raw_departure_datetime: flight.flight_departure_date,
                    raw_arrival_datetime: flight.flight_arrival_date
                }
            }
        })
    }
}

module.exports = FlightDataMapper;
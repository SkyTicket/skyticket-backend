class FlightDataFilters {
    static sortFlights(mappedFlights, sortBy){
        switch(sortBy){
            case 'lowest_price':
                mappedFlights.sort((a,b) => (a.seat_class_price.raw > b.seat_class_price.raw) ? 1 : ((b.seat_class_price.raw > a.seat_class_price.raw) ? -1 : 0))
            break;
            case 'highest_price':
                mappedFlights.sort((a,b) => (b.seat_class_price.raw > a.seat_class_price.raw) ? 1 : ((a.seat_class_price.raw > b.seat_class_price.raw) ? -1 : 0))
            break;
            case 'shortest_duration':
                mappedFlights.sort((a,b) => (a.flight_duration.raw > b.flight_duration.raw) ? 1 : ((b.flight_duration.raw > a.flight_duration.raw) ? -1 : 0))
            break;
            case 'earliest_departure':
                mappedFlights.sort((a,b) => (a.flight_details.raw_departure_datetime > b.flight_details.raw_departure_datetime) ? 1 : ((b.flight_details.raw_departure_datetime > a.flight_details.raw_departure_datetime) ? -1 : 0))
            break;
            case 'latest_departure':
                mappedFlights.sort((a,b) => (b.flight_details.raw_departure_datetime > a.flight_details.raw_departure_datetime) ? 1 : ((a.flight_details.raw_departure_datetime > b.flight_details.raw_departure_datetime) ? -1 : 0))
            break;
            case 'earliest_arrival':
                mappedFlights.sort((a,b) => (a.flight_details.raw_arrival_datetime > b.flight_details.raw_arrival_datetime) ? 1 : ((b.flight_details.raw_arrival_datetime > a.flight_details.raw_arrival_datetime) ? -1 : 0))
            break;
            case 'latest_arrival':
                mappedFlights.sort((a,b) => (b.flight_details.raw_arrival_datetime > a.flight_details.raw_arrival_datetime) ? 1 : ((a.flight_details.raw_arrival_datetime > b.flight_details.raw_arrival_datetime) ? -1 : 0))
            break;
            default:
                mappedFlights.sort((a,b) => (a.seat_class_price.raw > b.seat_class_price.raw) ? 1 : ((b.seat_class_price.raw > a.seat_class_price.raw) ? -1 : 0))
        }
    }
}

module.exports = FlightDataFilters;
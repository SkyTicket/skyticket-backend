const dotenv = require('dotenv').config()

const ErrorHandler = require('../utils/errorHandler');
const FlightDataFilters = require('../services/filters.flights');
const FlightSeatChecker = require('../helpers/flight_seat_checker.flights');
const FlightDataMapper = require('../utils/flightMapper');
const FlightQueries = require('../services/flightQueries.js');

class FlightsController {
    static async searchFlights(req, res, next){
        const {
            departure_airport,
            arrival_airport,
            flight_departure_date,
            returning_flight_departure_date,
            is_round_trip,
            seat_class_type,
            sort_by,
        } = req.query
        
        const returningDepartureAirport = arrival_airport;
        const returningArrivalAirport = departure_airport;
        
        let {
            page,
            limit,
            show_returning_flights,
            total_adult_passengers,
            total_child_passengers,
            total_infant_passengers,
        } = req.query
        
        page = parseInt(page) || 1;  
        limit = parseInt(limit) || 5;
        show_returning_flights = false;
        total_adult_passengers = 1;
        total_child_passengers = 0;
        total_infant_passengers = 0;

        const skip = (page - 1) * limit;

        try {
            const adultPassengersTotal = Number(total_adult_passengers)
            const childPassengersTotal = Number(total_child_passengers)
            const infantPassengersTotal = Number(total_infant_passengers)

            const passengersTotal = adultPassengersTotal + childPassengersTotal + infantPassengersTotal
            const totalNoInfant = passengersTotal - infantPassengersTotal

            // if returning departure date is earlier than departing date
            ErrorHandler.validateReturnDate(returning_flight_departure_date, flight_departure_date)

            // validate maximum passenger total
            ErrorHandler.passengersTotalValidation(totalNoInfant, infantPassengersTotal, adultPassengersTotal)

            // instantiate FlightQueries class object and its properties
            const flightQueries = new FlightQueries(departure_airport, arrival_airport, returningDepartureAirport, returningArrivalAirport);
            const flightQueriesResult = await flightQueries.findManyFlights(skip, limit, flight_departure_date, returning_flight_departure_date, seat_class_type)
            
            // if no flights record found
            ErrorHandler.ifNoFlightsFound(flightQueriesResult.departingFlights)

            if (show_returning_flights && flightQueriesResult.returningFlights.length === 0) {
                ErrorHandler.ifNoFlightsFound(flightQueriesResult.returningFlights);
            }

            // map departingFlights and returningFlights array respectively
            const mappedDepartingFlights = FlightDataMapper.mapFlights(flightQueriesResult.departingFlights, seat_class_type, totalNoInfant);
            const mappedReturningFlights = FlightDataMapper.mapFlights(flightQueriesResult.returningFlights, seat_class_type, totalNoInfant);

            // sort mappedFlights by query parameter of sort_by
            FlightDataFilters.sortFlights(mappedDepartingFlights, sort_by)
            FlightDataFilters.sortFlights(mappedReturningFlights, sort_by)

            // check if each flight has enough available seats for the total number of passengers (adults + children)
            let departingFlightSeatChecker = await FlightSeatChecker(mappedDepartingFlights, adultPassengersTotal, childPassengersTotal);
            let returningFlightSeatChecker = await FlightSeatChecker(mappedReturningFlights, adultPassengersTotal, childPassengersTotal);

            // check if all flights are full
            ErrorHandler.ifAllFlightsAreFull(departingFlightSeatChecker.filteredFlightsStatus)
            ErrorHandler.ifAllFlightsAreFull(returningFlightSeatChecker.filteredFlightsStatus)

            // base_url with full URL
            const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
            const params = new URLSearchParams(url.search);

            // delete 'page' and 'limit' query params
            params.delete('page');
            params.delete('limit');
            let fullUrlWithoutPageAndLimit = `${url.origin}${url.pathname}?${params.toString()}`;

            // if is_round_trip is true (yes)
            let returningFlightsUrl;
            if(is_round_trip === "true"){
                ErrorHandler.ifNoReturningDateInRoundTrip(returning_flight_departure_date)
                params.delete('flight_departure_date');
                params.delete('returning_flight_departure_date');
                params.delete('departure_airport');
                params.delete('arrival_airport');
                params.delete('is_round_trip');

                const encodedReturningFlightDepartureDate = encodeURIComponent(returning_flight_departure_date);
                const encodedFlightDepartureDate = encodeURIComponent(flight_departure_date);

                returningFlightsUrl = `${url.origin}${url.pathname}?${params.toString()}&flight_departure_date=${encodedReturningFlightDepartureDate}&departure_airport=${returningDepartureAirport}&arrival_airport=${returningArrivalAirport}&show_returning_flights=false`;
                fullUrlWithoutPageAndLimit = `${url.origin}${url.pathname}?${params.toString()}&flight_departure_date=${encodedFlightDepartureDate}&departure_airport=${departure_airport}&arrival_airport=${arrival_airport}&is_round_trip=${is_round_trip}&returning_flight_departure_date=${encodedReturningFlightDepartureDate}`;
            }

            const debugData = {
                departingFlightSeatChecker: {
                    bookedTicketsFlightIds: departingFlightSeatChecker.bookedTicketsFlightIds,
                    bookedSeatsPerFlight: departingFlightSeatChecker.bookedSeatsPerFlight,
                    flightSeatCapacities: departingFlightSeatChecker.flightSeatCapacities,
                    filteredFlightsStatus: departingFlightSeatChecker.filteredFlightsStatus,
                    departingFlightsTotal: flightQueriesResult.departingFlightsTotal
                },
                returningFlightSeatChecker: {
                    bookedTicketsFlightIds: returningFlightSeatChecker.bookedTicketsFlightIds,
                    bookedSeatsPerFlight: returningFlightSeatChecker.bookedSeatsPerFlight,
                    flightSeatCapacities: returningFlightSeatChecker.flightSeatCapacities,
                    filteredFlightsStatus: returningFlightSeatChecker.filteredFlightsStatus,
                    returningFlightsTotal: flightQueriesResult.returningFlightsTotal
                },
                show_returning_flights: show_returning_flights
            }

            return res.json({
                status: 'success',
                message: 'Berhasil menemukan penerbangan',
                ...(process.env.NODE_ENV !== 'production' && { debug: debugData }),
                passengers: {
                    adult: adultPassengersTotal,
                    child: childPassengersTotal,
                    infant: infantPassengersTotal,
                    total_no_infant: totalNoInfant,
                    total: passengersTotal,
                },
                flights: show_returning_flights === false ? {
                    flights_data: mappedDepartingFlights,
                    returning_flights_url: returningFlightsUrl,
                    pagination: {
                        current_page: page,
                        limit: limit,
                        prev_url: page > 1 ? `${fullUrlWithoutPageAndLimit}&page=${page - 1}&limit=${limit}` : null,
                        next_url: page >= Math.ceil(Number(flightQueriesResult.departingFlightsTotal) / Number(limit)) ? null : `${fullUrlWithoutPageAndLimit}&page=${page + 1}&limit=${limit}`,
                    },
                } : {
                    returning_flights: mappedReturningFlights,
                    pagination: {
                        current_page: page,
                        limit: limit,
                        prev_url: page > 1 ? `${fullUrlWithoutPageAndLimit}&page=${page - 1}&limit=${limit}` : null,
                        next_url: page >= Math.ceil(Number(flightQueriesResult.returningFlightsTotal) / Number(limit)) ? null : `${fullUrlWithoutPageAndLimit}&page=${page + 1}&limit=${limit}`,
                    }
                },
            })
        } catch(err) {
            if(err.statusCode){
                return res.status(err.statusCode).json({
                    status: 'error',
                    messages: {
                        line_1: err.message.line_1,
                        line_2: err.message.line_2,
                    }
                })
            }
            next(err)
        }
    }
}

module.exports = FlightsController;
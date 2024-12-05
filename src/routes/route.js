const express = require('express');
const app = express();

const IndexController = require('../controllers/index.controller');
const AirportsController = require('../controllers/flights/controllers/airports.controller');
const FlightsController = require('../controllers/flights/controllers/flights.controller');
const SeatController = require('../controllers/orderTiket/seatControllers');
const TiketController = require('../controllers/orderTiket/ticketControllers');

app.get('/', IndexController.index);
app.get('/api/v1/flights', FlightsController.searchFlights);
app.get('/api/v1/airports', AirportsController.searchAirports);
app.get('/api/v1/seat', SeatController.getDetailFlight )
app.post('/ticket-order', TiketController.createTicketOrder)

module.exports = app;
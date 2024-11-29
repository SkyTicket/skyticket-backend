const express = require('express');
const app = express();

const IndexController = require('../controllers/index.controller');
const AirportsController = require('../controllers/airports.controller');
const FlightsController = require('../controllers/flights/flights.controller');
// const FlightsPagination = require('../controllers/flights/flights.pagination');

app.get('/', IndexController.index);
app.get('/api/v1/flights', FlightsController.searchFlights);
// app.get('/api/v1/flights/paginate', FlightsPagination.paginate); // will delete soon or keep
app.get('/api/v1/airports', AirportsController.searchAirports);

module.exports = app;
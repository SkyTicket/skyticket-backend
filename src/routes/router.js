const express = require('express');
const app = express();

const IndexController = require('../controllers/index.controller');
const AirportsController = require('../controllers/airports.controller');
const FlightsController = require('../controllers/flights/flights.controller');

app.get('/', IndexController.index);
app.get('/api/v1/flights', FlightsController.searchFlights);
app.get('/api/v1/airports', AirportsController.searchAirports);

module.exports = app;
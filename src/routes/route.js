const express = require("express");
const app = express();

const IndexController = require("../controllers/flights/index.controller");
const AirportsController = require("../controllers/flights/controllers/airports.controller");
const FlightsController = require("../controllers/flights/controllers/flights.controller");
const SeatController = require("../controllers/orderTiket/seatControllers");
const TiketController = require("../controllers/orderTiket/ticketControllers");
const PaymentController = require("../controllers/orderTiket/transaksiControllers");
const { authMiddleware } = require("../middleware/auth");

//search & list tiket
app.get("/", IndexController.index);
app.get("/api/v1/flights", FlightsController.searchFlights);
app.get("/api/v1/airports", AirportsController.searchAirports);

//order-tiket
app.get("/api/v1/seat", authMiddleware, SeatController.getDetailFlight);
app.post("/ticket-order", authMiddleware, TiketController.createTicketOrder);
app.post("/create-payment", PaymentController.createPayment);
app.post("/midtrans-notification", PaymentController.paymentNotification);

module.exports = app;

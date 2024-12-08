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
app.get(
  "/api/v1/flights/detail",
  authMiddleware,
  SeatController.getDetailFlight
);

//transaksi
app.get("/api/v1/transaksi", authMiddleware, PaymentController.showTransaksi);
app.get(
  "/api/v1/transaksi/:userId",
  authMiddleware,
  PaymentController.showTransaksiByIdUser
);
app.post(
  "/api/v1/ticket-order",
  authMiddleware,
  TiketController.createTicketOrder
);
app.post("/api/v1/payment", authMiddleware, PaymentController.createPayment);
app.post(
  "/api/v1/payment/notification",
  authMiddleware,
  PaymentController.paymentNotification
);

module.exports = app;

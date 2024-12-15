const express = require("express");
const app = express();

const IndexController = require("../controllers/flights/index.controller");
const passport = require("passport");
const AuthMiddleware = require("../middleware/auth");
const authController = require("../controllers/auth/auth.controller");
const PasswordController = require("../controllers/auth/password.controller");
const UserController = require("../controllers/auth/user.controller");
const AirportsController = require("../controllers/flights/controllers/airports.controller");
const FlightsController = require("../controllers/flights/controllers/flights.controller");
const SeatController = require("../controllers/orderTiket/seatControllers");
const TiketController = require("../controllers/orderTiket/ticketControllers");
const PaymentController = require("../controllers/orderTiket/transaksiControllers");

app.get("/", IndexController.index);

//auth & reset password
app.post(
  "/api/v1/auth/register",
  AuthMiddleware.validateRegister,
  authController.register
);
app.post("/api/v1/auth/verify-otp", authController.verifyOtp);
app.post("/api/v1/auth/resend-otp", authController.resendOtp);
app.post("/api/v1/auth/login", authController.login);
app.post("/api/v1/auth/logout", authController.logout);
app.post("/api/v1/auth/forget-password", PasswordController.forgetPassword);
app.post(
  "/api/v1/auth/reset-password",
  AuthMiddleware.validateResetPassword,
  PasswordController.resetPassword
);

//oauth
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
//callback oauth setelah login
app.get(
  "/auth/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send(`Halo ${req.user.user_name}, Anda berhasil login dengan OAuth!`);
  }
);

//user
app.get(
  "/api/v1/user/all-users",
  AuthMiddleware.authenticateUser,
  UserController.getAllUsers
);
app.get(
  "/api/v1/user/get-user",
  AuthMiddleware.authenticateUser,
  UserController.getUserById
);
app.put(
  "/api/v1/user/update-user",
  AuthMiddleware.authenticateUser,
  AuthMiddleware.validateEditUser,
  UserController.editUser
);
app.delete(
  "/api/v1/user/delete-user",
  AuthMiddleware.authenticateUser,
  UserController.deleteUser
);

//flight
app.get("/api/v1/flights", FlightsController.searchFlights);
app.get("/api/v1/airports", AirportsController.searchAirports);
app.get("/api/v1/seat", SeatController.getDetailFlight);

//ticket
app.post("/ticket-order", TiketController.createTicketOrder);
app.post("/create-payment", PaymentController.createPayment);
app.post("/midtrans-notification", PaymentController.paymentNotification);

module.exports = app;

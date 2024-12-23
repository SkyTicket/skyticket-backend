const express = require("express");
const app = express();

const IndexController = require("../controllers/flights/index.controller");
const passport = require("passport");
const AuthMiddleware = require("../middleware/auth");
const authController = require("../controllers/auth/auth.controller");
const RegisterController = require("../controllers/auth/register/register.controller");
const OtpController = require("../controllers/auth/register/otp.controller");
const PasswordController = require("../controllers/auth/password.controller");
const UserController = require("../controllers/auth/user.controller");
const AirportsController = require("../controllers/flights/controllers/airports.controller");
const FlightsController = require("../controllers/flights/controllers/flights.controller");
const SeatController = require("../controllers/orderTiket/seatControllers");
const TiketController = require("../controllers/orderTiket/ticketControllers");
const ShowTransactionController = require("../controllers/transaction/show-transaction.controller");
const ShowTransactionControllerByIdUser = require("../controllers/transaction/show-transaction-by-userid.controller");
const PaymentController = require("../controllers/transaction/payment.controller");
const FavDestinationController = require("../controllers/favorite/fav.destination.controller");
const NotificationController = require("../controllers/notifications/notification.controller");
const AdminMiddleware = require("../middleware/admin");
const SeatClassesController = require("../controllers/flights/controllers/seat_classes.controller");
const EticketController = require("../controllers/eticket/eticket.controller");
const EticketGenerator = require("../controllers/eticket/eticket-generator");

//search & list tiket
app.get("/", IndexController.index);

//auth & reset password
app.post(
  "/api/v1/auth/register",
  AuthMiddleware.validateRegister,
  RegisterController.register
);

app.post("/api/v1/auth/verify-otp", OtpController.verifyOtp);
app.post("/api/v1/auth/resend-otp", OtpController.resendOtp);
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
  AdminMiddleware,
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

//fav destination
app.get(
  "/api/v1/favorite-destination",
  FavDestinationController.favDestination
);

//flight
app.get("/api/v1/flights", FlightsController.searchFlights);
app.get("/api/v1/seat-classes-price", SeatClassesController.seatClassPrice);
app.get("/api/v1/airports", AirportsController.searchAirports);
app.get(
  "/api/v1/flights/detail",
  AuthMiddleware.authenticateUser,
  SeatController.getDetailFlight
);

//transaksi
app.get(
  "/api/v1/transaksi",
  AuthMiddleware.authenticateUser,
  ShowTransactionController.showTransaksi
);
app.get(
  "/api/v1/transaksi/user",
  AuthMiddleware.authenticateUser,
  ShowTransactionControllerByIdUser.showTransaksiByIdUser
);

app.get(
  "/api/v1/transaksi/eticket-trigger/:bookingId",
  EticketGenerator.SendEticket
);

app.get("/api/v1/transaksi/eticket/:bookingId", EticketController.showEticket);

app.post(
  "/api/v1/ticket-order",
  AuthMiddleware.authenticateUser,
  TiketController.createTicketOrder
);
app.post(
  "/api/v1/payment/booking/:bookingId",
  AuthMiddleware.authenticateUser,
  PaymentController.createPayment
);
app.post(
  "/api/v1/payment/notification",
  AuthMiddleware.authenticateUser,
  PaymentController.paymentNotification
);

//notifications
app.post(
  "/api/v1/notifications/create",
  AuthMiddleware.authenticateUser,
  AdminMiddleware,
  NotificationController.create
);
app.get(
  "/api/v1/notifications/get",
  AuthMiddleware.authenticateUser,
  NotificationController.getNotifications
);
app.patch(
  "/api/v1/notifications/update/:notification_id",
  AuthMiddleware.authenticateUser,
  NotificationController.updateNotificationStatus
);

module.exports = app;

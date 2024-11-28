const express = require("express");
const bookingController = require("../controllers/bookingController");
const webhookController = require("../controllers/webhookController");

const router = express.Router();

router.post("/", bookingController.createBooking);
router.get("/:bookingId", bookingController.getBookingDetails);
router.post("/payment-status", webhookController.handlePaymentStatus);

module.exports = router;

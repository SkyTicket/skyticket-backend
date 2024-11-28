const bookingService = require("../services/bookingService");

exports.createBooking = async (req, res) => {
  const { userId, bookerId, flightId, passengers, paymentMethod } = req.body;

  try {
    const bookingResponse = await bookingService.createBooking(
      userId,
      bookerId,
      flightId,
      passengers,
      paymentMethod
    );
    res.status(201).json(bookingResponse);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create booking", error: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const bookingDetails = await bookingService.getBookingDetails(bookingId);
    res.status(200).json(bookingDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Failed to retrieve booking details",
        error: error.message,
      });
  }
};

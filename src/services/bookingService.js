const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

const MIDTRANS_SERVER_KEY = "SB-Mid-server-zGyELu5cNq66AH9QyJxGHVAl";
const MIDTRANS_API_URL =
  "https://app.sandbox.midtrans.com/snap/v1/transactions";

exports.createBooking = async (
  userId,
  bookerId,
  flightId,
  passengers,
  paymentMethod
) => {
  const orderId = `BOOKING-${Date.now()}`;

  const flight = await prisma.flights.findUnique({
    where: { flight_id: flightId },
  });
  if (!flight) throw new Error("Flight not found");

  const booker = await prisma.bookers.findUnique({
    where: { booker_id: bookerId },
  });
  if (!booker) throw new Error("Booker not found");

  const booking = await prisma.bookings.create({
    data: {
      booker_id: bookerId,
      booking_amount: flight.price * passengers.length,
      booking_payment_status: "PENDING",
      booking_payment_method: paymentMethod,
      booking_date: new Date(),
      passengers: {
        create: passengers.map((p) => ({
          passenger_name: p.name,
          passenger_type: p.type,
        })),
      },
    },
    include: { passengers: true },
  });

  const midtransResponse = await axios.post(
    MIDTRANS_API_URL,
    {
      transaction_details: {
        order_id: orderId,
        gross_amount: booking.booking_amount,
      },
      customer_details: {
        first_name: booker.booker_name,
        email: booker.booker_email,
      },
      item_details: [
        {
          id: flightId,
          price: flight.price,
          quantity: passengers.length,
          name: flight.flight_number,
        },
      ],
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString(
          "base64"
        )}`,
      },
    }
  );

  const { token, redirect_url } = midtransResponse.data;

  return { booking, token, redirect_url };
};

exports.getBookingDetails = async (bookingId) => {
  const booking = await prisma.bookings.findUnique({
    where: { booking_id: bookingId },
    include: { passengers: true, tickets: true },
  });
  if (!booking) throw new Error("Booking not found");

  return booking;
};

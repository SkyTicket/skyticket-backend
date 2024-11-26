-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('buyer', 'admin');

-- CreateEnum
CREATE TYPE "PassengerType" AS ENUM ('Infant', 'Child', 'Adult');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PROMO', 'SCHEDULE_CHANGE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('BOOKED', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SeatClass" AS ENUM ('Economy', 'PremiumEconomy', 'Business', 'FirstClass');

-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_role" "UserRole" NOT NULL,
    "user_phone" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "notification_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "notification_type" "NotificationType" NOT NULL,
    "notification_message" TEXT NOT NULL,
    "notification_is_read" BOOLEAN NOT NULL,
    "notification_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "Bookers" (
    "booker_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "booker_name" TEXT NOT NULL,
    "booker_email" TEXT NOT NULL,
    "booker_phone" TEXT NOT NULL,

    CONSTRAINT "Bookers_pkey" PRIMARY KEY ("booker_id")
);

-- CreateTable
CREATE TABLE "Passengers" (
    "passenger_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "passenger_name" TEXT NOT NULL,
    "passenger_type" "PassengerType" NOT NULL,

    CONSTRAINT "Passengers_pkey" PRIMARY KEY ("passenger_id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "booking_id" TEXT NOT NULL,
    "booker_id" TEXT NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "booking_amount" DECIMAL(15,2) NOT NULL,
    "booking_payment_status" "PaymentStatus" NOT NULL,
    "booking_payment_method" "PaymentMethod" NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "Booking_details" (
    "booking_detail_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "transaction_detail_quantity" INTEGER NOT NULL,

    CONSTRAINT "Booking_details_pkey" PRIMARY KEY ("booking_detail_id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "ticket_id" TEXT NOT NULL,
    "flight_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "aircraft_seat_id" TEXT NOT NULL,
    "ticket_status" "TicketStatus" NOT NULL,
    "ticket_qr" TEXT NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "Airports" (
    "airport_id" TEXT NOT NULL,
    "airport_name" TEXT NOT NULL,
    "airport_code" CHAR(3) NOT NULL,
    "airport_country" TEXT NOT NULL,
    "airport_city" TEXT NOT NULL,
    "Airport_city_image" TEXT NOT NULL,
    "airport_time_zone" TEXT NOT NULL,

    CONSTRAINT "Airports_pkey" PRIMARY KEY ("airport_id")
);

-- CreateTable
CREATE TABLE "Seat_classes" (
    "seat_class_id" TEXT NOT NULL,
    "seat_class_type" "SeatClass" NOT NULL,

    CONSTRAINT "Seat_classes_pkey" PRIMARY KEY ("seat_class_id")
);

-- CreateTable
CREATE TABLE "Flight_seat_classes" (
    "flight_seat_class_id" TEXT NOT NULL,
    "seat_class_id" TEXT NOT NULL,
    "flight_id" TEXT NOT NULL,
    "seat_class_price" DECIMAL(15,2) NOT NULL,
    "seat_class_capacity" INTEGER NOT NULL,

    CONSTRAINT "Flight_seat_classes_pkey" PRIMARY KEY ("flight_seat_class_id")
);

-- CreateTable
CREATE TABLE "Flights" (
    "flight_id" TEXT NOT NULL,
    "airline_id" TEXT NOT NULL,
    "flight_departure_airport_id" TEXT NOT NULL,
    "flight_arrival_airport_id" TEXT NOT NULL,
    "aircraft_id" TEXT NOT NULL,
    "flight_departure_date" TIMESTAMP(3) NOT NULL,
    "flight_arrival_date" TIMESTAMP(3) NOT NULL,
    "flight_number" TEXT NOT NULL,

    CONSTRAINT "Flights_pkey" PRIMARY KEY ("flight_id")
);

-- CreateTable
CREATE TABLE "Airlines" (
    "airline_id" TEXT NOT NULL,
    "airline_name" TEXT NOT NULL,
    "airline_code" TEXT NOT NULL,
    "Airline_logo" TEXT NOT NULL,

    CONSTRAINT "Airlines_pkey" PRIMARY KEY ("airline_id")
);

-- CreateTable
CREATE TABLE "Aircrafts" (
    "aircraft_id" TEXT NOT NULL,
    "aircraft_manufacturer" TEXT NOT NULL,
    "aircraft_type" CHAR(5) NOT NULL,

    CONSTRAINT "Aircrafts_pkey" PRIMARY KEY ("aircraft_id")
);

-- CreateTable
CREATE TABLE "Aircraft_seats" (
    "aircraft_seat_id" TEXT NOT NULL,
    "aircraft_id" TEXT NOT NULL,
    "aircraft_seat_position" CHAR(3) NOT NULL,

    CONSTRAINT "Aircraft_seats_pkey" PRIMARY KEY ("aircraft_seat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_email_key" ON "Users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_aircraft_seat_id_key" ON "Tickets"("aircraft_seat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_airport_code_key" ON "Airports"("airport_code");

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookers" ADD CONSTRAINT "Bookers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passengers" ADD CONSTRAINT "Passengers_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_booker_id_fkey" FOREIGN KEY ("booker_id") REFERENCES "Bookers"("booker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking_details" ADD CONSTRAINT "Booking_details_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking_details" ADD CONSTRAINT "Booking_details_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Tickets"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "Flights"("flight_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_aircraft_seat_id_fkey" FOREIGN KEY ("aircraft_seat_id") REFERENCES "Aircraft_seats"("aircraft_seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_seat_classes" ADD CONSTRAINT "Flight_seat_classes_seat_class_id_fkey" FOREIGN KEY ("seat_class_id") REFERENCES "Seat_classes"("seat_class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_seat_classes" ADD CONSTRAINT "Flight_seat_classes_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "Flights"("flight_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_airline_id_fkey" FOREIGN KEY ("airline_id") REFERENCES "Airlines"("airline_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_flight_departure_airport_id_fkey" FOREIGN KEY ("flight_departure_airport_id") REFERENCES "Airports"("airport_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_flight_arrival_airport_id_fkey" FOREIGN KEY ("flight_arrival_airport_id") REFERENCES "Airports"("airport_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('buyer', 'admin');

-- CreateEnum
CREATE TYPE "PassengerCategory" AS ENUM ('Adult', 'Child', 'Baby');

-- CreateEnum
CREATE TYPE "Title" AS ENUM ('Mr', 'Mrs');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PROMO', 'SCHEDULE_CHANGE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Issued', 'Unpaid', 'Cancelled');

-- CreateEnum
CREATE TYPE "SeatClass" AS ENUM ('Economy', 'PremiumEconomy', 'Business', 'FirstClass');

-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_role" "UserRole" NOT NULL DEFAULT 'buyer',
    "user_phone" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Password_reset_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Password_reset_tokens_pkey" PRIMARY KEY ("id")
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
    "title" "Title" NOT NULL DEFAULT 'Mr',
    "name" TEXT NOT NULL DEFAULT 'Unknown',
    "familyName" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nationality" TEXT NOT NULL DEFAULT 'Unknown',
    "identityNumber" TEXT NOT NULL DEFAULT 'Unknown',
    "issuingCountry" TEXT NOT NULL DEFAULT 'Unknown',
    "bookers_id" TEXT NOT NULL DEFAULT 'Unknown',
    "category" "PassengerCategory" NOT NULL DEFAULT 'Adult',
    "validUntil" TIMESTAMP(3),
    "deleteAt" TIMESTAMP(3),

    CONSTRAINT "Passengers_pkey" PRIMARY KEY ("passenger_id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "booking_id" TEXT NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "booking_amount" DECIMAL(15,2) NOT NULL,
    "booking_code" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tax" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "booking_payment_status" "PaymentStatus" NOT NULL,
    "booking_payment_method" TEXT,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "ticket_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "passenger_id" TEXT NOT NULL,
    "flight_seat_assigment_id" INTEGER NOT NULL,
    "category" "PassengerCategory" NOT NULL DEFAULT 'Adult',

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
CREATE TABLE "Flight_seat_assignments" (
    "id" SERIAL NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "flight_seat_class_id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "price" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "Flight_seat_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "seat_number" TEXT NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "TokenBlacklist" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_email_key" ON "Users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_reset_tokens_token_key" ON "Password_reset_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_airport_code_key" ON "Airports"("airport_code");

-- AddForeignKey
ALTER TABLE "Password_reset_tokens" ADD CONSTRAINT "Password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookers" ADD CONSTRAINT "Bookers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passengers" ADD CONSTRAINT "Passengers_bookers_id_fkey" FOREIGN KEY ("bookers_id") REFERENCES "Bookers"("booker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "Passengers"("passenger_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_flight_seat_assigment_id_fkey" FOREIGN KEY ("flight_seat_assigment_id") REFERENCES "Flight_seat_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_seat_classes" ADD CONSTRAINT "Flight_seat_classes_seat_class_id_fkey" FOREIGN KEY ("seat_class_id") REFERENCES "Seat_classes"("seat_class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_seat_classes" ADD CONSTRAINT "Flight_seat_classes_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "Flights"("flight_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_seat_assignments" ADD CONSTRAINT "Flight_seat_assignments_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_seat_assignments" ADD CONSTRAINT "Flight_seat_assignments_flight_seat_class_id_fkey" FOREIGN KEY ("flight_seat_class_id") REFERENCES "Flight_seat_classes"("flight_seat_class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_airline_id_fkey" FOREIGN KEY ("airline_id") REFERENCES "Airlines"("airline_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_flight_departure_airport_id_fkey" FOREIGN KEY ("flight_departure_airport_id") REFERENCES "Airports"("airport_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircrafts"("aircraft_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_flight_arrival_airport_id_fkey" FOREIGN KEY ("flight_arrival_airport_id") REFERENCES "Airports"("airport_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft_seats" ADD CONSTRAINT "Aircraft_seats_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircrafts"("aircraft_id") ON DELETE RESTRICT ON UPDATE CASCADE;

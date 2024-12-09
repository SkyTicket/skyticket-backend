/*
  Warnings:

  - A unique constraint covering the columns `[booking_code]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookings_booking_code_key" ON "Bookings"("booking_code");

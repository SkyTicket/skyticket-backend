/*
  Warnings:

  - Added the required column `booking_code` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "booking_code" TEXT NOT NULL;

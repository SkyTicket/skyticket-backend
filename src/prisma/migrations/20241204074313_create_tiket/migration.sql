/*
  Warnings:

  - The values [PENDING,COMPLETED,FAILED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `booker_id` on the `Bookings` table. All the data in the column will be lost.
  - The `booking_payment_method` column on the `Bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `booking_id` on the `Passengers` table. All the data in the column will be lost.
  - You are about to drop the column `passenger_name` on the `Passengers` table. All the data in the column will be lost.
  - You are about to drop the column `passenger_type` on the `Passengers` table. All the data in the column will be lost.
  - You are about to drop the column `aircraft_seat_id` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `flight_id` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_qr` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_status` on the `Tickets` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PassengerCategory" AS ENUM ('Adult', 'Child', 'Baby');

-- CreateEnum
CREATE TYPE "Title" AS ENUM ('Mr', 'Mrs');

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('Issued', 'Unpaid', 'Cancelled');
ALTER TABLE "Bookings" ALTER COLUMN "booking_payment_status" TYPE "PaymentStatus_new" USING ("booking_payment_status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_booker_id_fkey";

-- DropForeignKey
ALTER TABLE "Passengers" DROP CONSTRAINT "Passengers_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_aircraft_seat_id_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_flight_id_fkey";

-- DropIndex
DROP INDEX "Tickets_aircraft_seat_id_key";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "booker_id",
DROP COLUMN "booking_payment_method",
ADD COLUMN     "booking_payment_method" TEXT;

-- AlterTable
ALTER TABLE "Passengers" DROP COLUMN "booking_id",
DROP COLUMN "passenger_name",
DROP COLUMN "passenger_type",
ADD COLUMN     "bookers_id" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleteAt" TIMESTAMP(3),
ADD COLUMN     "familyName" TEXT,
ADD COLUMN     "identityNumber" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "issuingCountry" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "nationality" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "title" "Title" NOT NULL DEFAULT 'Mr',
ADD COLUMN     "validUntil" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "aircraft_seat_id",
DROP COLUMN "flight_id",
DROP COLUMN "ticket_qr",
DROP COLUMN "ticket_status",
ADD COLUMN     "category" "PassengerCategory" NOT NULL DEFAULT 'Adult';

-- DropEnum
DROP TYPE "PassengerType";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "TicketStatus";

-- AddForeignKey
ALTER TABLE "Passengers" ADD CONSTRAINT "Passengers_bookers_id_fkey" FOREIGN KEY ("bookers_id") REFERENCES "Bookers"("booker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

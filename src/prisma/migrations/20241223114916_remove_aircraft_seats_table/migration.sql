/*
  Warnings:

  - You are about to drop the `Aircraft_seats` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Title" ADD VALUE 'Ms';

-- DropForeignKey
ALTER TABLE "Aircraft_seats" DROP CONSTRAINT "Aircraft_seats_aircraft_id_fkey";

-- DropTable
DROP TABLE "Aircraft_seats";

/*
  Warnings:

  - Added the required column `Airline_logo` to the `Airlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Airport_city_image` to the `Airports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airlines" ADD COLUMN     "Airline_logo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Airports" ADD COLUMN     "Airport_city_image" TEXT NOT NULL;

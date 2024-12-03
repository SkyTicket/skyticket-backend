/*
  Warnings:

  - Added the required column `airport_time_zone` to the `Airports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airports" ADD COLUMN     "airport_time_zone" TEXT NOT NULL;

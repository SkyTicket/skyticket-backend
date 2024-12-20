/*
  Warnings:

  - Added the required column `available_seats` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "available_seats" INTEGER NOT NULL;

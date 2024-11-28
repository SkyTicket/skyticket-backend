/*
  Warnings:

  - You are about to drop the column `created_at` on the `Passenger` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `arrival` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `departure` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `ticket_id` to the `Passenger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ticket_flight_code_key";

-- AlterTable
ALTER TABLE "Passenger" DROP COLUMN "created_at",
ADD COLUMN     "ticket_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "arrival",
DROP COLUMN "departure",
DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

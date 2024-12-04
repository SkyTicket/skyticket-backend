-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "tax" DECIMAL(10,2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "flight_seat_assigment_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "passenger_id" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "Passengers"("passenger_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_flight_seat_assigment_id_fkey" FOREIGN KEY ("flight_seat_assigment_id") REFERENCES "Flight_seat_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

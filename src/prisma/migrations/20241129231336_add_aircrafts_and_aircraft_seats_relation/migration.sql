-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircrafts"("aircraft_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft_seats" ADD CONSTRAINT "Aircraft_seats_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircrafts"("aircraft_id") ON DELETE RESTRICT ON UPDATE CASCADE;

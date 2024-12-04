-- CreateTable
CREATE TABLE "Flight_seat_assignments" (
    "id" SERIAL NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "flight_seat_class_id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "price" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "Flight_seat_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "seat_number" TEXT NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flight_seat_assignments" ADD CONSTRAINT "Flight_seat_assignments_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_seat_assignments" ADD CONSTRAINT "Flight_seat_assignments_flight_seat_class_id_fkey" FOREIGN KEY ("flight_seat_class_id") REFERENCES "Flight_seat_classes"("flight_seat_class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

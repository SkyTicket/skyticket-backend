-- CreateEnum
CREATE TYPE "Continents" AS ENUM ('Asia', 'Amerika', 'Australia', 'Eropa', 'Afrika');

-- AlterTable
ALTER TABLE "Airports" ADD COLUMN     "airport_continent" "Continents";

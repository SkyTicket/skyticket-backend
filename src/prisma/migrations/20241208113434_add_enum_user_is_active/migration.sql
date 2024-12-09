-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('unverified', 'verified');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "user_is_active" "UserStatus" NOT NULL DEFAULT 'unverified';

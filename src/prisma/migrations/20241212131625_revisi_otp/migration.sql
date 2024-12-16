-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "last_otp_requested_at" TIMESTAMP(3),
ADD COLUMN     "otp_request_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "otp_request_reset_at" TIMESTAMP(3);

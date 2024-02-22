/*
  Warnings:

  - The `status` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "statusAppointment" AS ENUM ('WAITING', 'ACCEPTED', 'CANCELED', 'REFUSED');

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "status",
ADD COLUMN     "status" "statusAppointment" NOT NULL DEFAULT 'WAITING';

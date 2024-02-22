/*
  Warnings:

  - You are about to drop the column `criticity` on the `Appointment` table. All the data in the column will be lost.
  - The `status` column on the `Consultation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[idConsultation]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idConsultation` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "criticity",
ADD COLUMN     "idConsultation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "informations" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "resultat" TEXT NOT NULL DEFAULT '',
DROP COLUMN "status",
ADD COLUMN     "status" "statusConsultation" NOT NULL DEFAULT 'WAITING';

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_idConsultation_key" ON "Appointment"("idConsultation");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_idConsultation_fkey" FOREIGN KEY ("idConsultation") REFERENCES "Consultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

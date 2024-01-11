-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'MEDECIN', 'DERMATOLOGUE');

-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "statusConsultation" AS ENUM ('WAITING', 'IN_PROGRESS', 'PROCESSED', 'CLOSED', 'CANCELED');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'FILE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL,
    "email" TEXT NOT NULL,
    "sexe" TEXT NOT NULL DEFAULT 'M',
    "password" TEXT NOT NULL,
    "rppsNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "zipCode" TEXT,
    "secuNumber" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idMedecin" TEXT NOT NULL,
    "idPatient" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "criticity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idDermatologue" TEXT NOT NULL,
    "idPatient" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "criticity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idFrom" TEXT NOT NULL,
    "idToUser" TEXT NOT NULL,
    "idToIa" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "idConversation" TEXT NOT NULL,
    "idFrom" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ia" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "model" TEXT NOT NULL,
    "parameters" JSONB NOT NULL,

    CONSTRAINT "Ia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_rppsNumber_key" ON "User"("rppsNumber");

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_idMedecin_fkey" FOREIGN KEY ("idMedecin") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_idPatient_fkey" FOREIGN KEY ("idPatient") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_id_fkey" FOREIGN KEY ("id") REFERENCES "Consultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_idDermatologue_fkey" FOREIGN KEY ("idDermatologue") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_idPatient_fkey" FOREIGN KEY ("idPatient") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_idFrom_fkey" FOREIGN KEY ("idFrom") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_idToUser_fkey" FOREIGN KEY ("idToUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_idToIa_fkey" FOREIGN KEY ("idToIa") REFERENCES "Ia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_idConversation_fkey" FOREIGN KEY ("idConversation") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_idFrom_fkey" FOREIGN KEY ("idFrom") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

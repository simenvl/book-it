/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `VerificationToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Clinics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "postalCode" VARCHAR(4) NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Clinics_id_key" ON "Clinics"("id");

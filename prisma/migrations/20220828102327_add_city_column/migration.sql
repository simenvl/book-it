/*
  Warnings:

  - Added the required column `city` to the `Clinics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clinics" ADD COLUMN     "city" TEXT NOT NULL;

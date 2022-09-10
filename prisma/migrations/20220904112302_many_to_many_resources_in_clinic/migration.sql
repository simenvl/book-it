/*
  Warnings:

  - You are about to drop the column `clinicsId` on the `Resources` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resources" DROP CONSTRAINT "Resources_clinicsId_fkey";

-- AlterTable
ALTER TABLE "Resources" DROP COLUMN "clinicsId";

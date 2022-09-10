/*
  Warnings:

  - The primary key for the `ServicesWithResources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clinicsId` on the `ServicesWithResources` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_clinicsId_fkey";

-- AlterTable
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_pkey",
DROP COLUMN "clinicsId",
ADD CONSTRAINT "ServicesWithResources_pkey" PRIMARY KEY ("serviceId", "resourceId");

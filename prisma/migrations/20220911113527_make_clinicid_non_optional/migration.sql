/*
  Warnings:

  - The primary key for the `ServicesWithResources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `clinicsId` on table `ServicesWithResources` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_pkey",
ALTER COLUMN "clinicsId" SET NOT NULL,
ADD CONSTRAINT "ServicesWithResources_pkey" PRIMARY KEY ("serviceId", "resourceId", "clinicsId");

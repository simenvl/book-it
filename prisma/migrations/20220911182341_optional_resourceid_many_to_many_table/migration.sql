/*
  Warnings:

  - The primary key for the `ServicesWithResources` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_pkey",
ALTER COLUMN "resourceId" DROP NOT NULL,
ADD CONSTRAINT "ServicesWithResources_pkey" PRIMARY KEY ("serviceId", "clinicsId");

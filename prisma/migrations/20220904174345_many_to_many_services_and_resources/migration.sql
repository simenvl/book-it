/*
  Warnings:

  - You are about to drop the column `resourcesId` on the `Services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_resourcesId_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "resourcesId";

-- CreateTable
CREATE TABLE "ServicesWithResources" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "ServicesWithResources_pkey" PRIMARY KEY ("serviceId","resourceId")
);

-- AddForeignKey
ALTER TABLE "ServicesWithResources" ADD CONSTRAINT "ServicesWithResources_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesWithResources" ADD CONSTRAINT "ServicesWithResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

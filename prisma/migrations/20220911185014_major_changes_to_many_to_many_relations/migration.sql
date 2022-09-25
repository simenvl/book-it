/*
  Warnings:

  - The primary key for the `ServicesWithResources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clinicsId` on the `ServicesWithResources` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ServicesWithResources` table. All the data in the column will be lost.
  - You are about to drop the column `resourceId` on the `ServicesWithResources` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `ServicesWithResources` table. All the data in the column will be lost.
  - Added the required column `resourcesId` to the `ServicesWithResources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicesId` to the `ServicesWithResources` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_clinicsId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_serviceId_fkey";

-- AlterTable
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_pkey",
DROP COLUMN "clinicsId",
DROP COLUMN "id",
DROP COLUMN "resourceId",
DROP COLUMN "serviceId",
ADD COLUMN     "resourcesId" TEXT NOT NULL,
ADD COLUMN     "servicesId" TEXT NOT NULL,
ADD CONSTRAINT "ServicesWithResources_pkey" PRIMARY KEY ("resourcesId", "servicesId");

-- CreateTable
CREATE TABLE "ServiceInClinic" (
    "servicesId" TEXT NOT NULL,
    "clinicsId" TEXT NOT NULL,

    CONSTRAINT "ServiceInClinic_pkey" PRIMARY KEY ("servicesId","clinicsId")
);

-- AddForeignKey
ALTER TABLE "ServiceInClinic" ADD CONSTRAINT "ServiceInClinic_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceInClinic" ADD CONSTRAINT "ServiceInClinic_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesWithResources" ADD CONSTRAINT "ServicesWithResources_resourcesId_fkey" FOREIGN KEY ("resourcesId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesWithResources" ADD CONSTRAINT "ServicesWithResources_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

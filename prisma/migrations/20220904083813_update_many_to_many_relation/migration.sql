/*
  Warnings:

  - You are about to drop the column `resourceInClinicId` on the `Resources` table. All the data in the column will be lost.
  - You are about to drop the `ResourceInClinic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResourceInClinic" DROP CONSTRAINT "ResourceInClinic_clinicsId_fkey";

-- DropForeignKey
ALTER TABLE "Resources" DROP CONSTRAINT "Resources_resourceInClinicId_fkey";

-- AlterTable
ALTER TABLE "Resources" DROP COLUMN "resourceInClinicId";

-- DropTable
DROP TABLE "ResourceInClinic";

-- CreateTable
CREATE TABLE "ResourcesInClinic" (
    "id" TEXT NOT NULL,
    "clinicsId" TEXT NOT NULL,
    "resourcesId" TEXT NOT NULL,

    CONSTRAINT "ResourcesInClinic_pkey" PRIMARY KEY ("clinicsId","resourcesId")
);

-- AddForeignKey
ALTER TABLE "ResourcesInClinic" ADD CONSTRAINT "ResourcesInClinic_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesInClinic" ADD CONSTRAINT "ResourcesInClinic_resourcesId_fkey" FOREIGN KEY ("resourcesId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

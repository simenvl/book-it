-- DropForeignKey
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ServicesWithResources" DROP CONSTRAINT "ServicesWithResources_serviceId_fkey";

-- AlterTable
ALTER TABLE "ServicesWithResources" ADD COLUMN     "clinicsId" TEXT;

-- AddForeignKey
ALTER TABLE "ServicesWithResources" ADD CONSTRAINT "ServicesWithResources_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesWithResources" ADD CONSTRAINT "ServicesWithResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesWithResources" ADD CONSTRAINT "ServicesWithResources_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

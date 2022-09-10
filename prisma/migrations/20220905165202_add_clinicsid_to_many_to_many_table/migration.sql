-- AlterTable
ALTER TABLE "ServicesWithResources" ADD COLUMN     "clinicsId" TEXT;

-- AddForeignKey
ALTER TABLE "ServicesWithResources" ADD CONSTRAINT "ServicesWithResources_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

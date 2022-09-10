-- DropForeignKey
ALTER TABLE "ResourcesInClinic" DROP CONSTRAINT "ResourcesInClinic_clinicsId_fkey";

-- DropForeignKey
ALTER TABLE "ResourcesInClinic" DROP CONSTRAINT "ResourcesInClinic_resourcesId_fkey";

-- AddForeignKey
ALTER TABLE "ResourcesInClinic" ADD CONSTRAINT "ResourcesInClinic_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesInClinic" ADD CONSTRAINT "ResourcesInClinic_resourcesId_fkey" FOREIGN KEY ("resourcesId") REFERENCES "Resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

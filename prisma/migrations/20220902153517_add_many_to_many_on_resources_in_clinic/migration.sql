-- AlterTable
ALTER TABLE "Resources" ADD COLUMN     "resourceInClinicId" TEXT;

-- CreateTable
CREATE TABLE "ResourceInClinic" (
    "id" TEXT NOT NULL,
    "clinicsId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourceInClinic_id_key" ON "ResourceInClinic"("id");

-- AddForeignKey
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_resourceInClinicId_fkey" FOREIGN KEY ("resourceInClinicId") REFERENCES "ResourceInClinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceInClinic" ADD CONSTRAINT "ResourceInClinic_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

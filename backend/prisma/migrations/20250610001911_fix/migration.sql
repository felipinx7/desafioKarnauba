-- DropIndex
DROP INDEX "TaxiDriver_cityId_key";

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

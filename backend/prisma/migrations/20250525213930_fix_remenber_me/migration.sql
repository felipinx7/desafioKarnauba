/*
  Warnings:

  - Made the column `remenberMe` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "remenberMe" SET NOT NULL;

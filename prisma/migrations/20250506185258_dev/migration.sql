/*
  Warnings:

  - You are about to drop the column `description` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "description",
DROP COLUMN "type";

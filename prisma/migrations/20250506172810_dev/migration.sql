/*
  Warnings:

  - You are about to drop the `Dependency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dependency" DROP CONSTRAINT "Dependency_dependantId_fkey";

-- DropForeignKey
ALTER TABLE "Dependency" DROP CONSTRAINT "Dependency_originalId_fkey";

-- DropTable
DROP TABLE "Dependency";

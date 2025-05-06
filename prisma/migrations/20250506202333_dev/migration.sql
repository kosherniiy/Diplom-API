/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ObjectParameter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ObjectParameter` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ValueParameter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ValueParameter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ObjectParameter" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ValueParameter" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "ValueParameter" ADD CONSTRAINT "ValueParameter_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectParameter" ADD CONSTRAINT "ObjectParameter_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

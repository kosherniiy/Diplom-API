/*
  Warnings:

  - You are about to drop the column `templateName` on the `TestCase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ObjectParameter" DROP CONSTRAINT "ObjectParameter_testCaseId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_templateName_fkey";

-- DropForeignKey
ALTER TABLE "ValueParameter" DROP CONSTRAINT "ValueParameter_testCaseId_fkey";

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "templateName";

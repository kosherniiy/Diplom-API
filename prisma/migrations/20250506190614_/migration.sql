/*
  Warnings:

  - The primary key for the `Template` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `TestCase` table. All the data in the column will be lost.
  - Added the required column `templateName` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_templateId_fkey";

-- DropForeignKey
ALTER TABLE "_TemplateScripts" DROP CONSTRAINT "_TemplateScripts_B_fkey";

-- AlterTable
ALTER TABLE "Template" DROP CONSTRAINT "Template_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Template_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "templateId",
ADD COLUMN     "templateName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "_TemplateScripts" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_templateName_fkey" FOREIGN KEY ("templateName") REFERENCES "Template"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TemplateScripts" ADD CONSTRAINT "_TemplateScripts_B_fkey" FOREIGN KEY ("B") REFERENCES "Template"("name") ON DELETE CASCADE ON UPDATE CASCADE;

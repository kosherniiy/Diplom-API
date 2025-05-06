/*
  Warnings:

  - You are about to drop the `TemplateScript` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateScript" DROP CONSTRAINT "TemplateScript_scriptName_fkey";

-- DropForeignKey
ALTER TABLE "TemplateScript" DROP CONSTRAINT "TemplateScript_templateId_fkey";

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "TemplateScript";

-- CreateTable
CREATE TABLE "_TemplateScripts" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TemplateScripts_AB_unique" ON "_TemplateScripts"("A", "B");

-- CreateIndex
CREATE INDEX "_TemplateScripts_B_index" ON "_TemplateScripts"("B");

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TemplateScripts" ADD CONSTRAINT "_TemplateScripts_A_fkey" FOREIGN KEY ("A") REFERENCES "Script"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TemplateScripts" ADD CONSTRAINT "_TemplateScripts_B_fkey" FOREIGN KEY ("B") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

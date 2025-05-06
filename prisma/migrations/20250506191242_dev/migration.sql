/*
  Warnings:

  - You are about to drop the `_TemplateScripts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TemplateScripts" DROP CONSTRAINT "_TemplateScripts_A_fkey";

-- DropForeignKey
ALTER TABLE "_TemplateScripts" DROP CONSTRAINT "_TemplateScripts_B_fkey";

-- DropTable
DROP TABLE "_TemplateScripts";

-- CreateTable
CREATE TABLE "TemplateScript" (
    "id" SERIAL NOT NULL,
    "templateName" TEXT NOT NULL,
    "scriptName" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemplateScript_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TemplateScript" ADD CONSTRAINT "TemplateScript_templateName_fkey" FOREIGN KEY ("templateName") REFERENCES "Template"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateScript" ADD CONSTRAINT "TemplateScript_scriptName_fkey" FOREIGN KEY ("scriptName") REFERENCES "Script"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `Script` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Script` table. All the data in the column will be lost.
  - You are about to drop the column `sourceCode` on the `Script` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Script` table. All the data in the column will be lost.
  - You are about to drop the column `scriptId` on the `TemplateScript` table. All the data in the column will be lost.
  - Added the required column `scriptName` to the `TemplateScript` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dependency" DROP CONSTRAINT "Dependency_dependantId_fkey";

-- DropForeignKey
ALTER TABLE "Dependency" DROP CONSTRAINT "Dependency_originalId_fkey";

-- DropForeignKey
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_scriptId_fkey";

-- DropForeignKey
ALTER TABLE "Script" DROP CONSTRAINT "Script_userId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateScript" DROP CONSTRAINT "TemplateScript_scriptId_fkey";

-- AlterTable
ALTER TABLE "Script" DROP CONSTRAINT "Script_pkey",
DROP COLUMN "id",
DROP COLUMN "sourceCode",
DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER,
ADD CONSTRAINT "Script_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "TemplateScript" DROP COLUMN "scriptId",
ADD COLUMN     "scriptName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependency" ADD CONSTRAINT "Dependency_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "Script"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependency" ADD CONSTRAINT "Dependency_dependantId_fkey" FOREIGN KEY ("dependantId") REFERENCES "Script"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateScript" ADD CONSTRAINT "TemplateScript_scriptName_fkey" FOREIGN KEY ("scriptName") REFERENCES "Script"("name") ON DELETE CASCADE ON UPDATE CASCADE;

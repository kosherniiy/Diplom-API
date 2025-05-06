/*
  Warnings:

  - Added the required column `templateName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "templateName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_templateName_fkey" FOREIGN KEY ("templateName") REFERENCES "Template"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

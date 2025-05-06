/*
  Warnings:

  - Made the column `authorId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_authorId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Template" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

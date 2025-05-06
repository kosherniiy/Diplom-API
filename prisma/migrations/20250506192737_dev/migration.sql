/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "File";

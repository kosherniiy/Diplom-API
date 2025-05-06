/*
  Warnings:

  - You are about to drop the column `instructionsSrc` on the `Task` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "instructionsSrc",
ADD COLUMN     "instructions" TEXT NOT NULL,
ALTER COLUMN "authorId" DROP NOT NULL;

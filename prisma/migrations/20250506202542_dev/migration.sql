/*
  Warnings:

  - Added the required column `parameterId` to the `ValueParameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ValueParameter" ADD COLUMN     "parameterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ValueParameter" ADD CONSTRAINT "ValueParameter_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

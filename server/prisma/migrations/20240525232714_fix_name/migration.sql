/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Hotel` table. All the data in the column will be lost.
  - Made the column `hotelId` on table `Feature` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `owner` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_createdBy_fkey";

-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "hotelId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "createdBy",
ADD COLUMN     "owner" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

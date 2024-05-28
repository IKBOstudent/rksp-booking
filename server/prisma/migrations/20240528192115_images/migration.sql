/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "imageUrl",
ADD COLUMN     "images" TEXT[];

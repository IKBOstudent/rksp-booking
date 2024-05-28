/*
  Warnings:

  - You are about to drop the column `maximumGuestsCount` on the `Room` table. All the data in the column will be lost.
  - Added the required column `maximumGuests` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "maximumGuestsCount",
ADD COLUMN     "maximumGuests" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

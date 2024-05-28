/*
  Warnings:

  - You are about to drop the column `availableRoomsCount` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `guestsCount` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `hotelId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_hotelId_fkey";

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "availableRoomsCount",
DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "guestsCount",
DROP COLUMN "hotelId",
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "nightPrice" INTEGER NOT NULL,
    "maximumGuestsCount" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

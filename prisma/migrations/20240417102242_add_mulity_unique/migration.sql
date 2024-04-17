/*
  Warnings:

  - A unique constraint covering the columns `[concertDateId,seat]` on the table `ConcertDateUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConcertDateUser_concertDateId_seat_key" ON "ConcertDateUser"("concertDateId", "seat");

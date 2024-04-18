/*
  Warnings:

  - Made the column `expiredAt` on table `ConcertDateUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ConcertDateUser" ALTER COLUMN "expiredAt" SET NOT NULL;

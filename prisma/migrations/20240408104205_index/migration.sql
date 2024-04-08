/*
  Warnings:

  - Added the required column `type` to the `CashLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ConcertDate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ConcertDateUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "cashLogType" AS ENUM ('USE', 'CHARGE');

-- AlterTable
ALTER TABLE "CashLog" ADD COLUMN     "type" "cashLogType" NOT NULL;

-- AlterTable
ALTER TABLE "ConcertDate" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ConcertDateUser" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "CashLog_userId_idx" ON "CashLog"("userId");

-- CreateIndex
CREATE INDEX "ConcertDate_concertId_idx" ON "ConcertDate"("concertId");

-- CreateIndex
CREATE INDEX "ConcertDateUser_concertDateId_idx" ON "ConcertDateUser"("concertDateId");

-- CreateIndex
CREATE INDEX "UserToken_userId_idx" ON "UserToken"("userId");

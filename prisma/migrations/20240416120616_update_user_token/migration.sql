/*
  Warnings:

  - You are about to drop the column `isPass` on the `UserToken` table. All the data in the column will be lost.
  - Added the required column `entryTime` to the `UserToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredAt` to the `UserToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserToken" DROP COLUMN "isPass",
ADD COLUMN     "entryTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL;

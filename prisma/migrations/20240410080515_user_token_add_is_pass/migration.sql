/*
  Warnings:

  - You are about to drop the column `token` on the `UserToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserToken" DROP COLUMN "token",
ADD COLUMN     "isPass" BOOLEAN NOT NULL DEFAULT false;

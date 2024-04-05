/*
  Warnings:

  - Added the required column `name` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Concert" ADD COLUMN     "name" TEXT NOT NULL;

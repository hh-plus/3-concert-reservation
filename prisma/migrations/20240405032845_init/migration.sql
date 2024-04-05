-- CreateEnum
CREATE TYPE "payStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConcertDateUser" (
    "id" SERIAL NOT NULL,
    "concertDateId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "payStatus" "payStatus" NOT NULL DEFAULT 'UNPAID',

    CONSTRAINT "ConcertDateUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concert" (
    "id" SERIAL NOT NULL,
    "maxSeats" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Concert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConcertDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "concertId" INTEGER NOT NULL,

    CONSTRAINT "ConcertDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConcertDateUser" ADD CONSTRAINT "ConcertDateUser_concertDateId_fkey" FOREIGN KEY ("concertDateId") REFERENCES "ConcertDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertDateUser" ADD CONSTRAINT "ConcertDateUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertDate" ADD CONSTRAINT "ConcertDate_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

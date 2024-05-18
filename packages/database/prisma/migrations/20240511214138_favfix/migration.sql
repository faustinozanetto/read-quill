/*
  Warnings:

  - You are about to drop the `UserFavoriteThread` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFavoriteThread" DROP CONSTRAINT "UserFavoriteThread_threadId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteThread" DROP CONSTRAINT "UserFavoriteThread_userId_fkey";

-- DropTable
DROP TABLE "UserFavoriteThread";

-- CreateTable
CREATE TABLE "UserFavouriteThread" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavouriteThread_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFavouriteThread" ADD CONSTRAINT "UserFavouriteThread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavouriteThread" ADD CONSTRAINT "UserFavouriteThread_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

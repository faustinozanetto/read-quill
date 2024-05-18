/*
  Warnings:

  - You are about to drop the column `isfavorite` on the `Thread` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "isfavorite";

-- CreateTable
CREATE TABLE "UserFavoriteThread" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteThread_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFavoriteThread" ADD CONSTRAINT "UserFavoriteThread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteThread" ADD CONSTRAINT "UserFavoriteThread_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

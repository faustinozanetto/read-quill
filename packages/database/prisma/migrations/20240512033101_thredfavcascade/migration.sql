-- DropForeignKey
ALTER TABLE "UserFavouriteThread" DROP CONSTRAINT "UserFavouriteThread_threadId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavouriteThread" DROP CONSTRAINT "UserFavouriteThread_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserFavouriteThread" ADD CONSTRAINT "UserFavouriteThread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavouriteThread" ADD CONSTRAINT "UserFavouriteThread_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

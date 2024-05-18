-- DropForeignKey
ALTER TABLE "ThreadComment" DROP CONSTRAINT "ThreadComment_threadId_fkey";

-- AddForeignKey
ALTER TABLE "ThreadComment" ADD CONSTRAINT "ThreadComment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

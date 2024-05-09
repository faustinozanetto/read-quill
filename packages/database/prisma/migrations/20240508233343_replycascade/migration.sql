-- DropForeignKey
ALTER TABLE "ThreadComment" DROP CONSTRAINT "ThreadComment_replyToId_fkey";

-- AddForeignKey
ALTER TABLE "ThreadComment" ADD CONSTRAINT "ThreadComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "ThreadComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

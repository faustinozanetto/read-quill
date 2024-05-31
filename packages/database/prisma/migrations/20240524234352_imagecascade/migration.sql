-- DropForeignKey
ALTER TABLE "ThreadAttachment" DROP CONSTRAINT "ThreadAttachment_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadAttachment" DROP CONSTRAINT "ThreadAttachment_threadId_fkey";

-- AddForeignKey
ALTER TABLE "ThreadAttachment" ADD CONSTRAINT "ThreadAttachment_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadAttachment" ADD CONSTRAINT "ThreadAttachment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

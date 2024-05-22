-- CreateTable
CREATE TABLE "ThreadAttachment" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attachmentImage" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThreadAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreadAttachment" ADD CONSTRAINT "ThreadAttachment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

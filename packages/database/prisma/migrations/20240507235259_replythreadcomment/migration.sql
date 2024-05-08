/*
  Warnings:

  - A unique constraint covering the columns `[replyToId]` on the table `ThreadComment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ThreadComment" ADD COLUMN     "replyToId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ThreadComment_replyToId_key" ON "ThreadComment"("replyToId");

-- AddForeignKey
ALTER TABLE "ThreadComment" ADD CONSTRAINT "ThreadComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "ThreadComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

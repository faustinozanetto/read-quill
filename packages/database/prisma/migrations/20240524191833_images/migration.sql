/*
  Warnings:

  - You are about to drop the column `attachmentImage` on the `ThreadAttachment` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `ThreadAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThreadAttachment" DROP COLUMN "attachmentImage",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreadAttachment" ADD CONSTRAINT "ThreadAttachment_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

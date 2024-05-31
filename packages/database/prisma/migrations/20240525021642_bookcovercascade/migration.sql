-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_imageId_fkey";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

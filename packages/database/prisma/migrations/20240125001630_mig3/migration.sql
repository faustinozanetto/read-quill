-- DropForeignKey
ALTER TABLE "Annotation" DROP CONSTRAINT "Annotation_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ReadRegistry" DROP CONSTRAINT "ReadRegistry_bookId_fkey";

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadRegistry" ADD CONSTRAINT "ReadRegistry_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

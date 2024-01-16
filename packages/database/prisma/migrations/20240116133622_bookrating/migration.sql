-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "rating" INTEGER;

-- CreateTable
CREATE TABLE "Annotation" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "bookId" TEXT,

    CONSTRAINT "Annotation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

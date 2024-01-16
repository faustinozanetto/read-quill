/*
  Warnings:

  - You are about to drop the column `isFavorite` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_readerId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "isFavorite",
ADD COLUMN     "isFavourite" BOOLEAN;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_readerId_fkey" FOREIGN KEY ("readerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

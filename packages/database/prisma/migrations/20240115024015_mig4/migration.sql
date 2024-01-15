/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `BookReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_reviewId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "reviewId",
ADD COLUMN     "review" TEXT;

-- DropTable
DROP TABLE "BookReview";

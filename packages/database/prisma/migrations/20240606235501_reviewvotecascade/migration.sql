-- DropForeignKey
ALTER TABLE "ReviewLike" DROP CONSTRAINT "ReviewLike_reviewId_fkey";

-- AddForeignKey
ALTER TABLE "ReviewLike" ADD CONSTRAINT "ReviewLike_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

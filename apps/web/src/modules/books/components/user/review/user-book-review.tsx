'use client';

import React from 'react';
import UserBookReviewHeader from './user-book-review-header';
import { useBookStore } from '@modules/books/state/book.slice';
import { Separator, Skeleton } from '@read-quill/design-system';
import { useFetchReviewFromBook } from '@modules/review/hooks/use-fetch-review-from-book';
import UserBookReviewLike from './user-book-review-like';

interface UserBookReviewProps {
  isBookOwner: boolean;
}

const UserBookReview: React.FC<UserBookReviewProps> = (props) => {
  const { isBookOwner } = props;
  const { book } = useBookStore();
  const { data, isLoading } = useFetchReviewFromBook({ bookId: book?.id });

  const hasReview = Boolean(data?.data?.review);

  return (
    <div className="flex flex-col rounded-lg p-4 gap-2 shadow border">
      <UserBookReviewHeader
        readerWrittenReview={hasReview}
        contentLoading={isLoading}
        review={data?.data?.review ?? null}
      />
      <p>
        {isBookOwner ? (
          <>
            Share your thoughts and insights on your book. Reflect on your journey, highlight key takeaways, and engage
            your audience with detailed reviews.
          </>
        ) : (
          <>
            Explore reflections and insights on their book. Discover the author's perspectives, gain insights from their
            experiences, and decide if this book resonates with you.
          </>
        )}
      </p>
      <Separator />
      {isLoading && <Skeleton className="h-20 w-full" />}
      {!isLoading && data?.data?.review && (
        <div className="flex flex-col gap-2">
          <p className="block first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
            {data?.data?.review?.content}
          </p>
          <UserBookReviewLike reviewId={data.data.review.id} />
        </div>
      )}
      {!isLoading && !hasReview && (
        <p>
          {isBookOwner ? (
            <>
              It looks like you haven&apos;t written a review tet. Add one by clicking the{' '}
              <span className="text-primary font-bold underline">Add</span> button to get started.
            </>
          ) : (
            <>
              This user has not written a review yet! Check back later to see if they&apos;ve shared their thoughts on
              the book.
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default UserBookReview;

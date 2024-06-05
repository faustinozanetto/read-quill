'use client';

import React from 'react';
import UserBookReviewHeader from './user-book-review-header';
import { useBookStore } from '@modules/books/state/book.slice';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import { Skeleton } from '@read-quill/design-system';
import { useFetchReviewFromBook } from '@modules/review/hooks/use-fetch-review-from-book';

const UserBookReview: React.FC = () => {
  const { book } = useBookStore();
  const { isBookOwner } = useIsBookOwner();
  const { data, isLoading } = useFetchReviewFromBook({ bookId: book?.id });

  const hasReview = Boolean(data?.data?.review);

  return (
    <div className="flex flex-col rounded-lg p-4 gap-2 shadow border">
      <UserBookReviewHeader
        readerWrittenReview={hasReview}
        contentLoading={isLoading}
        review={data?.data?.review ?? null}
      />

      {isLoading && <Skeleton className="h-20 w-full" />}

      {!isLoading && hasReview && (
        <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
          {data?.data?.review?.content}
        </p>
      )}

      {!isLoading && !hasReview && (
        <p>
          {isBookOwner ? (
            <>
              No review found. Add one by clicking the <span className="text-primary font-bold underline">Add</span>{' '}
              button to get started.
            </>
          ) : (
            <>This user has not written a review yet!</>
          )}
        </p>
      )}
    </div>
  );
};

export default UserBookReview;

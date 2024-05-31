'use client';

import React from 'react';
import UserBookReviewHeader from './user-book-review-header';
import { useBookStore } from '@modules/books/state/book.slice';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import { Skeleton } from '@read-quill/design-system';

const UserBookReview: React.FC = () => {
  const { book, isLoading } = useBookStore();
  const { isBookOwner } = useIsBookOwner();
  const readerWrittenReview = !!book?.review;

  return (
    <div className="flex flex-col rounded-lg p-4 gap-2 shadow border">
      <UserBookReviewHeader readerWrittenReview={readerWrittenReview} />

      {isLoading && <Skeleton className="h-20 w-full" />}
      {!isLoading && readerWrittenReview && (
        <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
          {book.review}
        </p>
      )}

      {!isLoading && !readerWrittenReview && (
        <p>
          {isBookOwner ? (
            <>
              No review found, add one by clicking the <span className="text-primary font-bold underline">Add</span>{' '}
              button to get started.
            </>
          ) : (
            <>This use has not written a review yet!</>
          )}
        </p>
      )}
    </div>
  );
};

export default UserBookReview;

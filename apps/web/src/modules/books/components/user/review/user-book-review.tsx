'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBookReviewHeader from './user-book-review-header';

const UserBookReview: React.FC = () => {
  const { book, isLoading } = useBookStore();

  const readerWrittenReview = Boolean(book && book.review !== null);

  return (
    <div className="flex flex-col rounded-lg p-4 shadow border">
      <UserBookReviewHeader readerWrittenReview={readerWrittenReview} />

      {isLoading ? <Skeleton className="h-16 w-full my-2" /> : null}

      {!isLoading && book?.review ? (
        <p
          className="my-2 text-balance
        first-letter:text-6xl first-letter:font-bold first-letter:text-primary
        first-letter:mr-3 first-letter:float-left"
        >
          {book.review}
        </p>
      ) : null}

      {!isLoading && !readerWrittenReview ? <p>This reader has not written a review yet!</p> : null}
    </div>
  );
};

export default UserBookReview;

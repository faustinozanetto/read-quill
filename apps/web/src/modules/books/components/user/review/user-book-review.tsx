'use client';

import React from 'react';

import { useBookStore } from '@modules/books/state/book.slice';
import UserBookReviewHeader from './user-book-review-header';
import { Skeleton } from '@read-quill/design-system';

const UserBookReview: React.FC = () => {
  const { book, isLoading } = useBookStore();

  const readerWrittenReview = (book && book.review !== null) as boolean;

  return (
    <div className="flex flex-col rounded-lg p-4 shadow border">
      <UserBookReviewHeader readerWrittenReview={readerWrittenReview} />

      {isLoading ? <Skeleton className="h-16 w-full my-2" /> : book?.review ? <p>{book.review}</p> : null}

      {!isLoading && !readerWrittenReview ? <p>This reader has not written a review yet!</p> : null}
    </div>
  );
};

export default UserBookReview;

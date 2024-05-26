'use client';

import React from 'react';
import UserBookReviewHeader from './user-book-review-header';
import { useBookStore } from '@modules/books/state/book.slice';

const UserBookReview: React.FC = () => {
  const { book } = useBookStore();

  const readerWrittenReview = !!book?.review;

  return (
    <div className="flex flex-col rounded-lg p-4 gap-2 shadow border">
      <UserBookReviewHeader readerWrittenReview={readerWrittenReview} />

      {readerWrittenReview && (
        <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
          {book.review}
        </p>
      )}

      {!readerWrittenReview && (
        <p>
          No review found, add one by clicking the <span className="text-primary font-bold underline">Add</span> button
          to get started.
        </p>
      )}
    </div>
  );
};

export default UserBookReview;

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

  const { data, isFetching, isLoading } = useFetchReviewFromBook({ bookId: book?.id });
  const readerWrittenReview = Boolean(data?.review);

  const contentLoading = isFetching || isLoading;

  return (
    <div className="flex flex-col rounded-lg p-4 gap-2 shadow border">
      <UserBookReviewHeader
        readerWrittenReview={readerWrittenReview}
        contentLoading={contentLoading}
        review={data?.review ?? null}
      />

      {contentLoading && <Skeleton className="h-20 w-full" />}
      {!contentLoading && readerWrittenReview && data?.review && (
        <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
          {data.review.content}
        </p>
      )}

      {!contentLoading && !readerWrittenReview && !data?.review && (
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

import React from 'react';

import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import UserBookReviewManagement from './management/user-book-review-management';
import { useBookStore } from '@modules/books/state/book.slice';
import { Review } from '@read-quill/database';

interface UserBookReviewHeaderProps {
  readerWrittenReview: boolean;
  review: Review | null;
  contentLoading: boolean;
}

const UserBookReviewHeader: React.FC<UserBookReviewHeaderProps> = (props) => {
  const { readerWrittenReview, contentLoading, review } = props;

  const { book } = useBookStore();
  const { isBookOwner } = useIsBookOwner();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">User Review</h2>

      {!contentLoading && isBookOwner && book && (
        <UserBookReviewManagement readerWrittenReview={readerWrittenReview} bookId={book.id} review={review} />
      )}
    </div>
  );
};

export default UserBookReviewHeader;

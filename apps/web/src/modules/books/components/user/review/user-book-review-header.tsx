import React from 'react';

import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import UserBookReviewManagement from './management/user-book-review-management';
import { Review } from '@read-quill/database';
import { useBookContext } from '@modules/books/hooks/use-book-context';

interface UserBookReviewHeaderProps {
  readerWrittenReview: boolean;
  review: Review | null;
  contentLoading: boolean;
}

const UserBookReviewHeader: React.FC<UserBookReviewHeaderProps> = (props) => {
  const { readerWrittenReview, contentLoading, review } = props;

  const { book } = useBookContext();
  const { isBookOwner } = useIsBookOwner();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">📜 Review</h2>

      {!contentLoading && isBookOwner && book && (
        <UserBookReviewManagement readerWrittenReview={readerWrittenReview} bookId={book.id} review={review} />
      )}
    </div>
  );
};

export default UserBookReviewHeader;

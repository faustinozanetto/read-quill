import React from 'react';

import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import UserBookReviewManagement from './management/user-book-review-management';

interface UserBookReviewHeaderProps {
  readerWrittenReview: boolean;
}

const UserBookReviewHeader: React.FC<UserBookReviewHeaderProps> = (props) => {
  const { readerWrittenReview } = props;

  const { isBookOwner } = useIsBookOwner();

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
      <h2 className="text-2xl font-bold">User Review</h2>

      {isBookOwner ? <UserBookReviewManagement readerWrittenReview={readerWrittenReview} /> : null}
    </div>
  );
};

export default UserBookReviewHeader;

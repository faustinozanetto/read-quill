import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import UserBookReviewManagement from './management/user-book-review-management';

interface UserBookReviewHeaderProps {
  readerWrittenReview: boolean;
}

const UserBookReviewHeader: React.FC<UserBookReviewHeaderProps> = (props) => {
  const { readerWrittenReview } = props;

  const { isLoading } = useBookStore();
  const { isBookOwner } = useIsBookOwner();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
      <h2 className="text-2xl font-bold">User Review</h2>

      {isLoading ? <Skeleton className="h-10 w-full md:w-36" /> : null}
      {!isLoading && isBookOwner ? <UserBookReviewManagement readerWrittenReview={readerWrittenReview} /> : null}
    </div>
  );
};

export default UserBookReviewHeader;

import React from 'react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBookReviewManagement from './management/user-book-review-management';

interface UserBookReviewHeaderProps {
  readerWrittenReview: boolean;
}

const UserBookReviewHeader: React.FC<UserBookReviewHeaderProps> = (props) => {
  const { readerWrittenReview } = props;

  const { data: session } = useSession();
  const { book, isLoading } = useBookStore();

  const isBookOwner = session?.user && book && book.reader && book.reader.email === session.user.email;

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
      <h2 className="text-2xl font-bold">User Review</h2>
      {/* Management */}
      {isLoading ? (
        <Skeleton className="h-10 w-32" />
      ) : isBookOwner ? (
        <UserBookReviewManagement readerWrittenReview={readerWrittenReview} />
      ) : null}
    </div>
  );
};

export default UserBookReviewHeader;

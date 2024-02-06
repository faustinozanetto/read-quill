import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import UserBookAnnotationsManagement from './management/user-book-annotations-management';

const UserBookAnnotationsHeader: React.FC = () => {
  const { isLoading } = useBookStore();
  const { isBookOwner } = useIsBookOwner();

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
      <h2 className="text-2xl font-bold">Annotations</h2>

      {isLoading ? <Skeleton className="h-10 w-full md:w-36" /> : null}

      {!isLoading && isBookOwner ? <UserBookAnnotationsManagement /> : null}
    </div>
  );
};

export default UserBookAnnotationsHeader;

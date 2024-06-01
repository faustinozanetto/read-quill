import React from 'react';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import UserBookAnnotationsManagement from './management/user-book-annotations-management';
import { useBookStore } from '@modules/books/state/book.slice';

const UserBookAnnotationsHeader: React.FC = () => {
  const { book } = useBookStore();
  const { isBookOwner } = useIsBookOwner();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Annotations</h2>

      {isBookOwner && book ? <UserBookAnnotationsManagement bookId={book.id} /> : null}
    </div>
  );
};

export default UserBookAnnotationsHeader;

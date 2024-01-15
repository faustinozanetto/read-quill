'use client';

import React from 'react';

import { Skeleton } from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBookCover from './cover/user-book-cover';
import UserBookManagement from '../management/user-book-management';
import UserBookDetailsPlaceholder from './user-book-details-placeholder';

const UserBookDetails: React.FC = () => {
  const { book, isLoading } = useBookStore();

  if (isLoading || !book) return <UserBookDetailsPlaceholder />;

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      {isLoading ? <Skeleton className="h-80 md:h-[400px] md:w-60" /> : <UserBookCover coverUrl={book.coverImage} />}
      <div className="flex-1 flex-col">
        <h1 className="text-2xl font-bold md:text-3xl">{book.name}</h1>
        <h2 className="text-lg font-medium md:text-xl">{book.author}</h2>
        <span>{book.pageCount} pages</span>
      </div>

      <UserBookManagement />
    </div>
  );
};

export default UserBookDetails;

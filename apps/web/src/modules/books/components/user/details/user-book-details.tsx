'use client';

import React from 'react';

import { Skeleton } from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBookCover from './cover/user-book-cover';

const UserBookDetails: React.FC = () => {
  const { book, isLoading } = useBookStore();

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      {isLoading ? <Skeleton className="h-80 md:h-[400px] md:w-60" /> : <UserBookCover coverUrl={book?.coverImage!} />}
      <div className="flex-1 flex-col">
        {isLoading ? (
          <Skeleton className="h-6 w-1/2 mb-2" />
        ) : (
          <h1 className="text-2xl font-bold md:text-3xl">{book?.name!}</h1>
        )}
        {isLoading ? (
          <Skeleton className="mb-2 h-6 w-1/3" />
        ) : (
          <h2 className="text-lg font-medium md:text-xl">{book?.author!}</h2>
        )}
        {isLoading ? <Skeleton className="h-4 w-1/5" /> : <span>{book?.pageCount} pages</span>}
      </div>
    </div>
  );
};

export default UserBookDetails;

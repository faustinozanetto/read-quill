'use client';

import React from 'react';
import { useUserBooks } from '@modules/books/hooks/use-user-books';
import PaginationControls from '@modules/common/components/pagination/pagination-controls';
import BookCardPlaceholder from '../cards/book-card-placeholder';
import UserBooksHeader from './user-books-header';
import UserBooksFeed from './feed/user-books-feed';

const UserBooks: React.FC = () => {
  const {
    data,
    isLoading,
    isFetching,
    page,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    setPageIndex,
  } = useUserBooks({ pageSize: 4 });

  return (
    <div className="flex rounded-lg p-4 shadow border">
      <div className="flex w-full flex-col gap-2">
        <UserBooksHeader />

        {isFetching || isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
            ))}
          </div>
        ) : null}

        {!(isFetching || isLoading) && data.books.length > 0 ? (
          <>
            <UserBooksFeed books={data.books} />
            <PaginationControls
              getCanNextPage={getCanNextPage}
              getCanPreviousPage={getCanPreviousPage}
              nextPage={nextPage}
              page={page}
              pageCount={data.pageCount}
              previousPage={previousPage}
              setPageIndex={setPageIndex}
            />
          </>
        ) : null}

        {!(isFetching || isLoading) && data.books.length === 0 ? (
          <p>
            Let&apos;s build your book collection! Click the{' '}
            <span className="text-primary font-bold underline">Create Book</span> button to get started.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default UserBooks;

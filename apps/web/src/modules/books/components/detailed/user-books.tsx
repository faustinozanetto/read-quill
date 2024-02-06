'use client';

import React from 'react';
import { useUserBooks } from '@modules/books/hooks/use-user-books';
import { BOOKS_INITIAL_FILTERS, BOOKS_INITIAL_SORT } from '@modules/books/lib/book-filtering.lib';
import { FilterProvider } from '@modules/common/components/filter/filter-provider';
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
  } = useUserBooks({ pageSize: 6 });

  return (
    <div className="flex w-full flex-col gap-2">
      <UserBooksHeader />

      {isFetching || isLoading ? (
        <div
          className="grid gap-4 p-4 border rounded-lg shadow"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!(isFetching || isLoading) && data.books.length > 0 ? (
        <FilterProvider
          initialState={{
            initialFilters: BOOKS_INITIAL_FILTERS,
            initialSort: BOOKS_INITIAL_SORT,
          }}
        >
          <div className="rounded-lg shadow border space-y-4">
            <UserBooksFeed
              books={data.books}
              getCanNextPage={getCanNextPage}
              getCanPreviousPage={getCanPreviousPage}
              nextPage={nextPage}
              page={page}
              pageCount={data.pageCount}
              previousPage={previousPage}
              setPageIndex={setPageIndex}
            />
          </div>
        </FilterProvider>
      ) : null}

      {!(isFetching || isLoading) && data.books.length === 0 ? (
        <p>
          Let&apos;s build your book collection! Click the{' '}
          <span className="text-primary font-bold underline">Create Book</span> button to get started.
        </p>
      ) : null}
    </div>
  );
};

export default UserBooks;

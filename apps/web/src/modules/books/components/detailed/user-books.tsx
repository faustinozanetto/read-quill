'use client';

import React from 'react';
import { useUserBooks } from '@modules/books/hooks/use-user-books';
import { BOOKS_INITIAL_FILTERS, BOOKS_INITIAL_SORT } from '@modules/books/lib/book-filtering.lib';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import BookCardPlaceholder from '../cards/book-card-placeholder';
import UserBooksHeader from './user-books-header';
import UserBooksFeed from './feed/user-books-feed';

interface UserBooksProps {
  userId: string;
}

const UserBooks: React.FC<UserBooksProps> = (props) => {
  const { userId } = props;

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
  } = useUserBooks({ pageSize: 6, userId });

  return (
    <div className="flex w-full flex-col gap-2">
      <UserBooksHeader />

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
          >
            {isFetching || isLoading ? (
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
                ))}
              </div>
            ) : null}
          </UserBooksFeed>
        </div>
      </FilterProvider>

      {!(isFetching || isLoading) && data.books.length === 0 ? (
        <div className="rounded-lg p-4 shadow border space-y-4">
          <p>
            Let&apos;s build your book collection! Click the{' '}
            <span className="text-primary font-bold underline">Create Book</span> button to get started.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default UserBooks;

'use client';

import React from 'react';
import { useUserBooks } from '@modules/books/hooks/use-user-books';
import { BOOKS_INITIAL_FILTERS, BOOKS_INITIAL_SORT } from '@modules/books/lib/book-filtering.lib';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import UserLibraryBooksHeader from './user-library-books-header';
import UserLibraryBooksFeed from './feed/user-library-books-feed';
import BookCardPlaceholder from '@modules/books/components/cards/book-card-placeholder';

const UserLibraryBooks: React.FC = () => {
  const { user } = useAuthContext();

  const { data, getCanNextPage, getCanPreviousPage, isLoading, nextPage, page, previousPage, setPageIndex } =
    useUserBooks({
      pageSize: 6,
      userId: user?.id,
    });

  return (
    <div className="flex w-full flex-col gap-2">
      <UserLibraryBooksHeader />

      <FilterProvider
        initialState={{
          initialFilters: BOOKS_INITIAL_FILTERS,
          initialSort: BOOKS_INITIAL_SORT,
        }}
      >
        <div className="rounded-lg shadow border space-y-4">
          <UserLibraryBooksFeed
            books={data?.data?.books ?? []}
            getCanNextPage={getCanNextPage}
            getCanPreviousPage={getCanPreviousPage}
            nextPage={nextPage}
            page={page}
            pageCount={data?.data?.pageCount ?? 0}
            previousPage={previousPage}
            setPageIndex={setPageIndex}
          >
            {isLoading ? (
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
                ))}
              </div>
            ) : null}

            {!isLoading && !data?.data?.books.length ? (
              <p className="m-auto">
                Let&apos;s build your book collection! Click the{' '}
                <span className="text-primary text-center font-bold underline">Create Book</span> button to get started.
              </p>
            ) : null}
          </UserLibraryBooksFeed>
        </div>
      </FilterProvider>
    </div>
  );
};

export default UserLibraryBooks;

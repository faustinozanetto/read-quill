'use client';

import React from 'react';
import { useUserBooks } from '@modules/books/hooks/use-user-books';
import BookCardPlaceholder from '../cards/book-card-placeholder';
import UserBooksHeader from './user-books-header';
import UserBooksFeed from './feed/user-books-feed';
import UserBooksFeedPagination from './feed/user-books-feed-pagination';

const UserBooks: React.FC = () => {
  const { data, isLoading, isFetching, getCanNextPage, getCanPreviousPage, nextPage, previousPage, page } =
    useUserBooks({ pageSize: 4 });

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
            <UserBooksFeedPagination
              getCanNextPage={getCanNextPage}
              getCanPreviousPage={getCanPreviousPage}
              nextPage={nextPage}
              page={page}
              pageCount={data.pageCount}
              previousPage={previousPage}
            />
          </>
        ) : null}

        {!(isFetching || isLoading) && data.books.length === 0 ? <p>This user has not read any books so far!</p> : null}
      </div>
    </div>
  );
};

export default UserBooks;

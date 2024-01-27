'use client';

import React from 'react';
import BooksFeed from '@modules/books/components/feed/books-feed';
import { __URL__ } from '@modules/common/lib/common.constants';
import BookCardPlaceholder from '@modules/books/components/cards/book-card-placeholder';
import UserProfileBooksHeader from './user-profile-books-header';
import { useUserBooks } from '@modules/books/hooks/use-user-books';

const UserProfileBooks: React.FC = () => {
  const { data, isFetching, isLoading } = useUserBooks({ pageSize: 6 });

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow border">
      <UserProfileBooksHeader />

      {isFetching || isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!(isFetching || isLoading) && data.books.length > 0 ? <BooksFeed books={data.books} /> : null}

      {!(isFetching || isLoading) && data.books.length === 0 ? <p>This user has not read any books so far!</p> : null}
    </div>
  );
};

export default UserProfileBooks;

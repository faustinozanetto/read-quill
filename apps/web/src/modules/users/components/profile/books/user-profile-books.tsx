'use client';

import React from 'react';
import BooksFeed from '@modules/books/components/feed/books-feed';
import { __URL__ } from '@modules/common/lib/common.constants';
import BookCardPlaceholder from '@modules/books/components/cards/book-card-placeholder';
import { useUserBooks } from '@modules/books/hooks/use-user-books';
import UserProfileBooksHeader from './user-profile-books-header';
import { useParams } from 'next/navigation';

const UserProfileBooks: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const { data, isLoading } = useUserBooks({ pageSize: 6, userId: params.userId });

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow border">
      <UserProfileBooksHeader />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && data && data.data?.books.length ? <BooksFeed books={data.data.books} /> : null}

      {!isLoading && data && !data?.data?.books.length ? <p>This user has not read any books so far!</p> : null}
    </div>
  );
};

export default UserProfileBooks;

'use client';

import React from 'react';
import type { Book } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import BooksFeed from '@modules/books/components/feed/books-feed';
import { __URL__ } from '@modules/common/lib/common.constants';
import BookCardPlaceholder from '@modules/books/components/cards/book-card-placeholder';
import UserProfileBooksHeader from './user-profile-books-header';

const UserProfileBooks: React.FC = () => {
  const params = useParams();

  const { isLoading, data } = useQuery<Book[]>(['user-books', params.userId], {
    queryFn: async () => {
      const userId = params.userId as string;
      const url = new URL('/api/users/books', __URL__);
      url.searchParams.set('userId', userId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user books!');
      }

      const { books }: { books: Book[] } = await response.json();
      return books;
    },
  });

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow border">
      <UserProfileBooksHeader />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && data && data.length > 0 ? <BooksFeed books={data} /> : null}

      {!isLoading && data && data.length === 0 ? <p>This user has not read any books so far!</p> : null}
    </div>
  );
};

export default UserProfileBooks;

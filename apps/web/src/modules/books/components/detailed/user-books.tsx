'use client';

import React from 'react';
import type { Book } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useUserBooksStore } from '@modules/books/state/user-books.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import BookCardPlaceholder from '../cards/book-card-placeholder';
import UserBooksHeader from './user-books-header';
import UserBooksFeed from './feed/user-books-feed';

const UserBooks: React.FC = () => {
  const { data: session } = useSession();

  const { setUserBooks, setIsLoading, books, isLoading } = useUserBooksStore();

  useQuery<Book[]>(['user-books', session?.user.id], {
    queryFn: async () => {
      if (!session?.user) return [];

      const url = new URL('/api/users/books', __URL__);
      url.searchParams.set('userId', session.user.id);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user books!');
      }

      const data = await response.json();
      return data.books;
    },
    onSuccess(data) {
      setIsLoading(false);
      setUserBooks(data);
    },
    onError() {
      setIsLoading(false);
    },
  });

  return (
    <div className="flex rounded-lg p-4 shadow border">
      <div className="flex w-full flex-col gap-2">
        <UserBooksHeader />

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
            ))}
          </div>
        ) : null}

        {!isLoading && books.length > 0 && <UserBooksFeed books={books} />}
      </div>
    </div>
  );
};

export default UserBooks;

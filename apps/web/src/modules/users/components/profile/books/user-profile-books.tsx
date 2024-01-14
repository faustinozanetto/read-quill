'use client';

import React from 'react';
import type { Book } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import UserProfileBooksHeader from './user-profile-books-header';

const UserProfileBooks: React.FC = () => {
  const params = useParams();

  const { isLoading, data } = useQuery<Book[]>(['user-books', params.userId], {
    queryFn: async () => {
      const userId = params.userId as string;
      const url = new URL('/api/user/books', process.env.NEXT_PUBLIC_URL);
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
    <div className="flex rounded-lg p-4 shadow border">
      <div className="flex w-full flex-col">
        <UserProfileBooksHeader />

        {!isLoading && data && data.length === 0 ? <p>This user has not read any books so far!</p> : null}
      </div>
    </div>
  );
};

export default UserProfileBooks;

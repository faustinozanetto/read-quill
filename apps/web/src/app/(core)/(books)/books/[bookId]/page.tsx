'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBook from '@modules/books/components/user/user-book';
import type { BookWithReader } from '@modules/books/types/book.types';
import { __URL__ } from '@modules/common/lib/common.constants';

interface UserBookPageProps {
  params: {
    bookId: string;
  };
}

const UserBookPage: React.FC<UserBookPageProps> = (props) => {
  const { params } = props;
  const { bookId } = params;

  const { setBook, setIsLoading } = useBookStore();

  useQuery<BookWithReader>(['book-page', bookId], {
    queryFn: async () => {
      const url = new URL('/api/books', __URL__);
      url.searchParams.set('bookId', bookId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch book!');
      }

      const { book }: { book: BookWithReader } = await response.json();
      return book;
    },
    onSuccess(data) {
      setBook(data);
      setIsLoading(false);
    },
    onError() {
      setIsLoading(false);
    },
  });

  return (
    <div className="container my-4">
      <UserBook />
    </div>
  );
};

export default UserBookPage;

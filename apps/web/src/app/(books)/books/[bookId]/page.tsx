'use client';

import React from 'react';
import { Book } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBook from '@modules/books/components/user/user-book';

interface UserBookPageProps {
  params: {
    bookId: string;
  };
}

const UserBookPage: React.FC<UserBookPageProps> = (props) => {
  const { params } = props;
  const { bookId } = params;

  const { setBook, setIsLoading } = useBookStore();

  const { data } = useQuery<Book>(['book-page', bookId], {
    queryFn: async () => {
      const url = new URL('/api/books', process.env.NEXT_PUBLIC_URL);
      url.searchParams.set('bookId', bookId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch book!');
      }

      const { book }: { book: Book } = await response.json();
      return book;
    },
    onSuccess(data) {
      setBook(data);
      setIsLoading(false);
    },
    onError(err) {
      setIsLoading(false);
    },
  });

  return <UserBook />;
};

export default UserBookPage;

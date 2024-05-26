'use client';

import React, { useEffect } from 'react';
import UserBookDetails from './details/user-book-details';
import UserBookReview from './review/user-book-review';
import UserBookAnnotations from './annotations/user-book-annotations';
import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import { BookGetResponse } from '@modules/api/types/books-api.types';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBookDetailsPlaceholder from './details/user-book-details-placeholder';
import { useFetchBook } from '@modules/books/hooks/use-fetch-book';

interface UserBookProps {
  bookId: string;
}

const UserBook: React.FC<UserBookProps> = (props) => {
  const { bookId } = props;

  useFetchBook({ bookId });

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <UserBookDetails />
      <UserBookReview />
      <UserBookAnnotations />
    </section>
  );
};

export default UserBook;

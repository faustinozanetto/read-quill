'use client';

import React from 'react';
import UserBookDetails from './details/user-book-details';
import UserBookReview from './review/user-book-review';
import UserBookAnnotations from './annotations/user-book-annotations';
import { useFetchBook } from '@modules/books/hooks/use-fetch-book';
import UserBookReadRegistries from './read-registries/user-book-read-registries';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';

interface UserBookProps {
  bookId: string;
}

const UserBook: React.FC<UserBookProps> = (props) => {
  const { bookId } = props;

  useFetchBook({ bookId });

  const { isBookOwner } = useIsBookOwner();

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <UserBookDetails />
      <UserBookReview />
      <UserBookAnnotations />
      {isBookOwner && <UserBookReadRegistries />}
    </section>
  );
};

export default UserBook;

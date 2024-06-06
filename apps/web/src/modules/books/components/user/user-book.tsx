'use client';

import React from 'react';
import UserBookDetails from './details/user-book-details';
import UserBookReview from './review/user-book-review';
import UserBookAnnotations from './annotations/user-book-annotations';
import { useFetchBook } from '@modules/books/hooks/use-fetch-book';
import UserBookReadRegistries from './read-registries/user-book-read-registries';

interface UserBookProps {
  bookId: string;
  isBookOwner: boolean;
}

const UserBook: React.FC<UserBookProps> = (props) => {
  const { bookId, isBookOwner } = props;

  useFetchBook({ bookId });

  return (
    <section className="space-y-4">
      <UserBookDetails />
      <UserBookReview isBookOwner={isBookOwner} />
      <UserBookAnnotations isBookOwner={isBookOwner} />
      {isBookOwner && <UserBookReadRegistries />}
    </section>
  );
};

export default UserBook;

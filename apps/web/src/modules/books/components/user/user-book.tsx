'use client';

import React from 'react';
import UserBookDetails from './details/user-book-details';
import UserBookReview from './review/user-book-review';
import UserBookAnnotations from './annotations/user-book-annotations';
import { useFetchBook } from '@modules/books/hooks/use-fetch-book';
import UserBookReadRegistries from './read-registries/user-book-read-registries';
import UserBookInsights from './insights/user-book-insights';
import UserBookReadActivity from './read-activity/user-book-read-activity';

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
      <UserBookInsights />
      <UserBookReview isBookOwner={isBookOwner} />
      <UserBookAnnotations isBookOwner={isBookOwner} />
      {isBookOwner && <UserBookReadRegistries />}
      <UserBookReadActivity />
    </section>
  );
};

export default UserBook;

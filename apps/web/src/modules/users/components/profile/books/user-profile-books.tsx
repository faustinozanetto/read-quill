'use client';

import React from 'react';
import BooksFeed from '@modules/books/components/feed/books-feed';
import { __URL__ } from '@modules/common/lib/common.constants';
import BookCardPlaceholder from '@modules/books/components/cards/book-card-placeholder';
import { useUserBooks } from '@modules/books/hooks/use-user-books';
import UserProfileBooksHeader from './user-profile-books-header';
import { useParams } from 'next/navigation';
import { BookIcon, Button, Separator } from '@read-quill/design-system';
import Link from 'next/link';

const BOOKS_FETCH = 6;

const UserProfileBooks: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const { data, isLoading } = useUserBooks({ pageSize: BOOKS_FETCH, userId: params.userId });

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow border">
      <UserProfileBooksHeader />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: BOOKS_FETCH }).map((_, i) => (
            <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && data && data.data?.books.length ? (
        <div className="flex flex-col space-y-4">
          <BooksFeed books={data.data.books} />
          <Separator />
          <Button className="w-full md:w-fit md:ml-auto" asChild>
            <Link href={`/users/${params.userId}/books`} title="See More Books" aria-label="See More Books">
              <BookIcon className="mr-2" />
              See More Books
            </Link>
          </Button>
        </div>
      ) : null}

      {!isLoading && data && !data?.data?.books.length ? <p>This user has not read any books so far!</p> : null}
    </div>
  );
};

export default UserProfileBooks;

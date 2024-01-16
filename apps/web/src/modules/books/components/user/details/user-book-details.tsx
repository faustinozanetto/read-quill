'use client';

import React from 'react';
import { useBookStore } from '@modules/books/state/book.slice';
import { useSession } from 'next-auth/react';
import UserBookManagement from '../management/user-book-management';
import BookPagesBadge from '../../common/book-pages-badge';
import BookFavourite from '../../common/book-favourite';
import BookLanguageBadge from '../../common/book-language-badge';
import BookStartedAt from '../../common/book-started-at';
import BookFinishedAt from '../../common/book-finished-at';
import UserBookCover from './cover/user-book-cover';
import UserBookDetailsPlaceholder from './user-book-details-placeholder';

const UserBookDetails: React.FC = () => {
  const { book, isLoading } = useBookStore();
  const { data: session } = useSession();

  if (isLoading || !book) return <UserBookDetailsPlaceholder />;

  const isBookOwner = Boolean(book && session?.user.id === book.reader?.id);

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      <UserBookCover coverUrl={book.coverImage} />
      <div className="flex-1 flex-col">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold md:text-2xl">{book.name}</h1>
          {isBookOwner ? <BookFavourite book={book} /> : null}
        </div>
        <h2 className="text-lg font-medium md:text-xl">{book.author}</h2>
        <BookPagesBadge className="mr-2" pageCount={book.pageCount} />
        <BookLanguageBadge language={book.language} />
        <div className="flex justify-between md:justify-start md:gap-2">
          {book.startedAt ? <BookStartedAt className="mt-2" startedAt={book.startedAt} /> : null}
          {book.finishedAt ? <BookFinishedAt className="mt-2" finishedAt={book.finishedAt} /> : null}
        </div>
      </div>
      {isBookOwner ? <UserBookManagement /> : null}
    </div>
  );
};

export default UserBookDetails;

'use client';

import React from 'react';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import UserBookManagement from '../management/user-book-management';
import BookPagesBadge from '../../common/book-pages-badge';
import BookFavourite from '../../common/book-favourite';
import BookLanguageBadge from '../../common/book-language-badge';
import BookStartedAt from '../../common/book-started-at';
import BookFinishedAt from '../../common/book-finished-at';
import BookRating from '../../common/rating/book-rating';
import UserBookCover from './cover/user-book-cover';

import { useBookContext } from '@modules/books/hooks/use-book-context';

const UserBookDetails: React.FC = () => {
  const { book } = useBookContext();
  const { isBookOwner } = useIsBookOwner();

  if (!book) return null;

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 md:flex-row border">
      <UserBookCover
        className="md:w-60"
        image={book.image}
        // placeholderImage={book.placeholderImage}
        isPriority
      />
      <div className="flex-1 flex-col pl-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold md:text-2xl">{book.name}</h1>
          <div className="flex gap-2">
            {isBookOwner ? <BookFavourite book={book} /> : null}
            {isBookOwner && book ? <UserBookManagement book={book} /> : null}
          </div>
        </div>
        <h2 className="md:text-lg">{book.author}</h2>
        <BookPagesBadge className="mr-2" pageCount={book.pageCount} />
        <BookLanguageBadge language={book.language} />
        <div className="flex justify-between md:justify-start md:gap-2">
          {book.startedAt ? <BookStartedAt className="mt-2" startedAt={book.startedAt} /> : null}
          {book.finishedAt ? <BookFinishedAt className="mt-2" finishedAt={book.finishedAt} /> : null}
        </div>
        <BookRating className="mt-2" book={book} />
      </div>
    </div>
  );
};

export default UserBookDetails;

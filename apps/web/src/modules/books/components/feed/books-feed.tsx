import React from 'react';
import type { Book } from '@read-quill/database';
import BookCard, { BookCardStyleProps } from '../cards/book-card';
import { cva } from 'class-variance-authority';

const variants = cva('gap-2.5', {
  variants: {
    variant: {
      landscape: 'flex flex-col grow',
      vertical: 'grid sm:grid-cols-2 lg:grid-cols-3',
    },
  },
});

interface BooksFeedProps {
  books: Book[];
  cardVariant?: BookCardStyleProps['variant'];
}

const BooksFeed: React.FC<BooksFeedProps> = (props) => {
  const { books, cardVariant = 'vertical' } = props;

  return (
    <div className={variants({ variant: cardVariant })}>
      {books.map((book) => {
        return <BookCard book={book} key={`book-${book.id}`} variant={cardVariant} />;
      })}
    </div>
  );
};

export default BooksFeed;

import React from 'react';
import BookCard, { BookCardStyleProps } from '../cards/book-card';
import { cva } from 'class-variance-authority';
import { BookWithDetails } from '@modules/books/types/book.types';

const variants = cva('gap-2.5', {
  variants: {
    variant: {
      landscape: 'flex flex-col grow',
      vertical: 'grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    },
  },
});

interface BooksFeedProps {
  books: BookWithDetails[];
  cardVariant?: BookCardStyleProps['variant'];
  className?: string;
}

const BooksFeed: React.FC<BooksFeedProps> = (props) => {
  const { books, cardVariant = 'vertical', className } = props;

  return (
    <div className={variants({ variant: cardVariant, className })}>
      {books.map((book) => {
        return <BookCard book={book} key={`book-${book.id}`} variant={cardVariant} />;
      })}
    </div>
  );
};

export default BooksFeed;

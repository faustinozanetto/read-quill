import React from 'react';
import type { Book } from '@read-quill/database';
import BookCard, { BookCardStyleProps } from '../cards/book-card';

interface BooksFeedProps {
  books: Book[];
  cardVariant?: BookCardStyleProps['variant'];
}

const BooksFeed: React.FC<BooksFeedProps> = (props) => {
  const { books, cardVariant = 'vertical' } = props;

  return (
    <div className="flex flex-col gap-4">
      {books.map((book) => {
        return <BookCard book={book} key={`book-${book.id}`} variant={cardVariant} />;
      })}
    </div>
  );
};

export default BooksFeed;

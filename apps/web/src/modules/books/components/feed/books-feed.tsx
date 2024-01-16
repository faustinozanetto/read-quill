import React from 'react';
import type { Book } from '@read-quill/database';
import BookCard from '../cards/book-card';

interface BooksFeedProps {
  books: Book[];
}

const BooksFeed: React.FC<BooksFeedProps> = (props) => {
  const { books } = props;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
      }}
    >
      {books.map((book) => {
        return <BookCard book={book} key={`book-${book.id}`} />;
      })}
    </div>
  );
};

export default BooksFeed;

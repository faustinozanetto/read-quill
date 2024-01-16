import React from 'react';
import type { Book } from '@read-quill/database';
import BooksFeed from '../feed/books-feed';

interface UserBooksFeedProps {
  books: Book[];
}

const UserBooksFeed: React.FC<UserBooksFeedProps> = (props) => {
  const { books } = props;

  return (
    <div className="flex w-full flex-col gap-2">
      <BooksFeed books={books} />
    </div>
  );
};

export default UserBooksFeed;

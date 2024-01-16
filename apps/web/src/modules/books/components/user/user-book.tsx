import React from 'react';
import UserBookDetails from './details/user-book-details';
import UserBookReview from './review/user-book-review';

const UserBook: React.FC = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <UserBookDetails />
      <UserBookReview />
    </section>
  );
};

export default UserBook;

import React from 'react';
import UserBookDetails from './details/user-book-details';
import UserBookReview from './review/user-book-review';
import UserBookAnnotations from './annotations/user-book-annotations';

const UserBook: React.FC = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <UserBookDetails />
      <UserBookReview />
      <UserBookAnnotations />
    </section>
  );
};

export default UserBook;

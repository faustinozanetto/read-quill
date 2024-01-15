import React from 'react';
import UserBookDetails from './details/user-book-details';

const UserBook: React.FC = () => {
  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 md:px-4 lg:px-6">
      <UserBookDetails />
    </section>
  );
};

export default UserBook;

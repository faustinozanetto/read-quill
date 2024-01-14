import React from 'react';
import UserBooksHeader from './user-books-header';

const UserBooks: React.FC = () => {
  return (
    <div className="flex rounded-lg p-4 shadow border">
      <div className="flex w-full flex-col gap-2">
        <UserBooksHeader />
      </div>
    </div>
  );
};

export default UserBooks;

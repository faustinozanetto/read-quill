import React from 'react';
import UserLibraryBooks from './books/user-library-books';

const UserLibrary: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <UserLibraryBooks />
    </div>
  );
};

export default UserLibrary;

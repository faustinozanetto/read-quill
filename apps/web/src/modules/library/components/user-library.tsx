import React from 'react';
import UserLibraryBooks from './books/user-library-books';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import UserLibraryBooksHeaderPrivate from './books/headers/user-library-books-header-private';

const UserLibrary: React.FC = () => {
  const { user } = useAuthContext();

  return <UserLibraryBooks userId={user?.id} onRenderHeader={<UserLibraryBooksHeaderPrivate />} />;
};

export default UserLibrary;

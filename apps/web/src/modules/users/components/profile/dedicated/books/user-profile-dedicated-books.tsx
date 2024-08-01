'use client';

import React from 'react';
import UserLibraryBooksHeaderPublic from '@modules/library/components/books/headers/user-library-books-header-public';
import UserLibraryBooks from '@modules/library/components/books/user-library-books';
import { useUserContext } from '@modules/users/hooks/use-user-context';

export const UserProfileDedicatedBooks: React.FC = (props) => {
  const user = useUserContext((s) => s.user);

  return (
    <UserLibraryBooks userId={user.id} onRenderHeader={<UserLibraryBooksHeaderPublic title={`${user.name} Books`} />} />
  );
};

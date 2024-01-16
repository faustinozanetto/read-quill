'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@read-quill/design-system';
import UserBooksManagement from './management/user-books-management';

const UserBooksHeader: React.FC = () => {
  const { status } = useSession();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
      <h2 className="text-2xl font-bold">Books</h2>
      {/* Management */}
      {status === 'loading' ? <Skeleton className="h-10 w-full md:w-32" /> : <UserBooksManagement />}
    </div>
  );
};

export default UserBooksHeader;

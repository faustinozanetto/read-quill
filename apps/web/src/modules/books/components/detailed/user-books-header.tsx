'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@read-quill/design-system';
import UserBooksManagement from './management/user-books-management';

const UserBooksHeader: React.FC = () => {
  const { status } = useSession();

  return (
    <div className="flex flex-col rounded-lg shadow border p-4 gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books</h1>
        {status === 'loading' ? <Skeleton className="h-10 w-full md:w-32" /> : <UserBooksManagement />}
      </div>
      <p>
        Welcome to your personal bookshelf! Here, you&apos;ll find all the books you&apos;ve added and organized, ready
        to dive into whenever you&apos;re ready. Browse through your collection and explore new literary adventures.
        Your bookshelf awaits!
      </p>
    </div>
  );
};

export default UserBooksHeader;

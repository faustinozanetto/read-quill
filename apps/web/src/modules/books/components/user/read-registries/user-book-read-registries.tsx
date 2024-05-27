'use client';

import React from 'react';

import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import { useBookReadRegistries } from '@modules/books/hooks/use-book-read-registries';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBookReadRegistriesTable from './user-book-read-registries-table';

const UserBookReadRegistries: React.FC = () => {
  const { book } = useBookStore();
  const { data, isFetching, isLoading, pagination, setPagination } = useBookReadRegistries({
    bookId: book?.id,
    pageSize: 8,
  });

  return (
    <div className="flex flex-col rounded-lg p-4 shadow border gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Read Registries</h2>
      </div>

      <p>Manage and view the read registries for your book here.</p>
      <UserBookReadRegistriesTable data={data} pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default UserBookReadRegistries;

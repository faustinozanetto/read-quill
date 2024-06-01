'use client';

import React from 'react';

import { useBookReadRegistries } from '@modules/books/hooks/use-book-read-registries';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBookReadRegistriesTable from './user-book-read-registries-table';
import { Badge, Button, PlusIcon } from '@read-quill/design-system';
import ReadRegistryCreate from '@modules/read-registries/components/create/read-registry-create';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

const UserBookReadRegistries: React.FC = () => {
  const { book } = useBookStore();
  const { data, isFetching, isLoading, pagination, setPagination } = useBookReadRegistries({
    bookId: book?.id,
    pageSize: 8,
  });
  const { queryClient } = useQueriesStore();

  const handleOnRegistryCreated = async () => {
    await queryClient.refetchQueries(['book-read-registries', pagination, book?.id]);
  };

  return (
    <div className="flex flex-col rounded-lg p-4 shadow border gap-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold">Read Registries</h2>
          <Badge variant="outline">Visible to you</Badge>
        </div>

        <ReadRegistryCreate
          createButton={
            <Button aria-label="Create Registry" size="sm">
              <PlusIcon className="mr-2 stroke-current" />
              Create Registry
            </Button>
          }
          onSuccess={handleOnRegistryCreated}
          bookId={book?.id}
        />
      </div>

      <p>Manage and view the read registries for your book here.</p>
      <UserBookReadRegistriesTable data={data} pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default UserBookReadRegistries;

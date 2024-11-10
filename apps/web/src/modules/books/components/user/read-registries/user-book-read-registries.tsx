'use client';

import React from 'react';

import { useBookReadRegistries } from '@modules/books/hooks/use-book-read-registries';
import UserBookReadRegistriesTable from './user-book-read-registries-table';
import { Badge, Button, PlusIcon, Separator, Skeleton } from '@read-quill/design-system';
import ReadRegistryCreate from '@modules/read-registries/components/create/read-registry-create';
import { useQueryClient } from '@tanstack/react-query';
import { useBookContext } from '@modules/books/hooks/use-book-context';

const UserBookReadRegistries: React.FC = () => {
  const { book, isBookOwner } = useBookContext();
  const { data, isLoading, pagination, setPagination } = useBookReadRegistries({
    bookId: book?.id,
    pageSize: 8,
  });
  const queryClient = useQueryClient();

  const handleOnRegistryCreated = async () => {
    await queryClient.refetchQueries({ queryKey: ['book-read-registries'] });
  };

  if (!isBookOwner) return null;

  return (
    <div className="flex flex-col rounded-lg p-4 border gap-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold">🖋️ Read Registries</h2>
          <Badge variant="outline">Visible to you</Badge>
        </div>
        <ReadRegistryCreate
          createButton={
            <Button aria-label="Create Registry" size="sm" variant="outline">
              <PlusIcon className="mr-2 stroke-current" />
              Create
            </Button>
          }
          onSuccess={handleOnRegistryCreated}
          bookId={book?.id}
        />
      </div>
      <p>
        Here, you can manage and view your reading registries. Track your progress over time and celebrate your reading
        milestones. Use the table below to add, edit, or delete registries, ensuring your reading journey is
        meticulously documented and effortlessly managed.
      </p>
      <Separator />
      {isLoading && <Skeleton className="h-40 w-full" />}
      {!isLoading && data?.data?.readRegistries.length ? (
        <UserBookReadRegistriesTable data={data} pagination={pagination} setPagination={setPagination} />
      ) : null}
    </div>
  );
};

export default UserBookReadRegistries;

'use client';

import React from 'react';

import ReadRegistryCreate from '@modules/read-registries/components/create/read-registry-create';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { Button, PlusIcon } from '@read-quill/design-system';

const DashboardReadRegistriesHeader: React.FC = () => {
  const { queryClient } = useQueriesStore();

  const handleOnReadRegistryCreated = async () => {
    await queryClient.refetchQueries(['dashboard-read-targets']);
    await queryClient.refetchQueries(['dashboard-read-registries']);
    await queryClient.refetchQueries(['dashboard-books-progress']);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
      <h2 className="text-2xl font-bold">Read Registries</h2>
      <ReadRegistryCreate
        onSuccess={handleOnReadRegistryCreated}
        createButton={
          <Button aria-label="Create Read Registry" className="w-full sm:ml-auto sm:w-fit" size="sm">
            <PlusIcon className="mr-2 stroke-current" />
            Create Read Registry
          </Button>
        }
      />
    </div>
  );
};

export default DashboardReadRegistriesHeader;

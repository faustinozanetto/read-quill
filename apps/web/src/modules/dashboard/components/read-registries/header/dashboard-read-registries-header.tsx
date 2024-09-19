'use client';

import React from 'react';

import ReadRegistryCreate from '@modules/read-registries/components/create/read-registry-create';
import { Button, PlusIcon } from '@read-quill/design-system';
import { useQueryClient } from '@tanstack/react-query';

const DashboardReadRegistriesHeader: React.FC = () => {
  const queryClient = useQueryClient();

  const handleOnReadRegistryCreated = async () => {
    await queryClient.refetchQueries({ queryKey: ['dashboard-read-targets'] });
    await queryClient.refetchQueries({ queryKey: ['dashboard-read-registries'] });
    await queryClient.refetchQueries({ queryKey: ['dashboard-books-progress'] });
    await queryClient.refetchQueries({
      queryKey: ['dashboard-has-read'],
    });
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">✒️ Read Registries</h2>
      <ReadRegistryCreate
        onSuccess={handleOnReadRegistryCreated}
        createButton={
          <Button aria-label="Create Read Registry" variant="outline" size="sm">
            <PlusIcon className="mr-2 stroke-current" />
            Create
          </Button>
        }
      />
    </div>
  );
};

export default DashboardReadRegistriesHeader;

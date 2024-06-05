import React from 'react';

import type { Row } from '@tanstack/react-table';
import type { ReadRegistry } from '@read-quill/database';

import ReadRegistryActions from '@modules/read-registries/components/read-registry-actions';
import { useQueryClient } from '@tanstack/react-query';

interface DashboardReadRegistriesRowActionsProps {
  row: Row<ReadRegistry>;
}

const DashboardReadRegistriesRowActions: React.FC<DashboardReadRegistriesRowActionsProps> = (props) => {
  const { row } = props;

  const queryClient = useQueryClient();

  const handleOnReadRegistryModified = async () => {
    await queryClient.refetchQueries({ queryKey: ['dashboard-read-targets'] });
    await queryClient.refetchQueries({ queryKey: ['dashboard-read-registries'] });
    await queryClient.refetchQueries({ queryKey: ['dashboard-books-progress'] });
    await queryClient.refetchQueries({ queryKey: ['dashboard-average-reading-time'] });
  };

  return (
    <ReadRegistryActions
      readRegistry={row.original}
      onEdited={handleOnReadRegistryModified}
      onDeleted={handleOnReadRegistryModified}
    />
  );
};

export default DashboardReadRegistriesRowActions;

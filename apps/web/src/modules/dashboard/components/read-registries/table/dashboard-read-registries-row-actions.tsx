import React from 'react';

import type { Row } from '@tanstack/react-table';
import type { ReadRegistry } from '@read-quill/database';

import ReadRegistryActions from '@modules/read-registries/components/read-registry-actions';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

interface DashboardReadRegistriesRowActionsProps {
  row: Row<ReadRegistry>;
}

const DashboardReadRegistriesRowActions: React.FC<DashboardReadRegistriesRowActionsProps> = (props) => {
  const { row } = props;

  const { queryClient } = useQueriesStore();

  const handleOnReadRegistryModified = async () => {
    await queryClient.refetchQueries(['dashboard-read-targets']);
    await queryClient.refetchQueries(['dashboard-read-registries']);
    await queryClient.refetchQueries(['dashboard-books-progress']);
    await queryClient.refetchQueries(['dashboard-average-reading-time']);
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

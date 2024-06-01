import React from 'react';

import type { Row } from '@tanstack/react-table';
import type { ReadRegistry } from '@read-quill/database';

import ReadRegistryActions from '@modules/read-registries/components/read-registry-actions';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

interface UserBookReadRegistriesRowActionsProps {
  row: Row<ReadRegistry>;
}

const UserBookReadRegistriesRowActions: React.FC<UserBookReadRegistriesRowActionsProps> = (props) => {
  const { row } = props;

  const { queryClient } = useQueriesStore();

  const handleOnReadRegistryModified = async () => {
    await queryClient.refetchQueries(['book-read-registries']);
  };

  return (
    <ReadRegistryActions
      readRegistry={row.original}
      onEdited={handleOnReadRegistryModified}
      onDeleted={handleOnReadRegistryModified}
    />
  );
};

export default UserBookReadRegistriesRowActions;

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DotsHorizontalIcon,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@read-quill/design-system';
import type { Row } from '@tanstack/react-table';
import type { ReadRegistry } from '@read-quill/database';
import DashboardReadRegistryEdit from '../management/edit/dashboard-read-registry-edit';
import DashboardReadRegistryDelete from '../management/delete/dashboard-read-registry-delete';

interface DashboardReadRegistriesRowActionsProps {
  row: Row<ReadRegistry>;
}

const DashboardReadRegistriesRowActions: React.FC<DashboardReadRegistriesRowActionsProps> = (props) => {
  const { row } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DashboardReadRegistryEdit row={row} />
        <DropdownMenuSeparator />
        <DashboardReadRegistryDelete row={row} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardReadRegistriesRowActions;

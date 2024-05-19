import React from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ManageIcon,
} from '@read-quill/design-system';
import DashboardReadTargetsManagementEdit from './edit/dashboard-read-targets-management-edit';
import { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadTargetsManagementDelete from './dashboard-read-targets-management-delete';

interface DashboardReadTargetsManagementProps {
  readTargets: NonNullable<DashboardReadTargetsGetResponse['result']>;
}

const DashboardReadTargetsManagement: React.FC<DashboardReadTargetsManagementProps> = (props) => {
  const { readTargets } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <ManageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 mt-4" side="left">
        <DropdownMenuLabel className="p-1">Manage Targets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <DashboardReadTargetsManagementEdit readTargets={readTargets} />
          <DashboardReadTargetsManagementDelete />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardReadTargetsManagement;

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
  EditIcon,
  useToast,
} from '@read-quill/design-system';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadTargetsEditForm from './dashboard-read-targets-management-edit-form';
import { useEditReadTargets } from '@modules/dashboard/hooks/read-targets/use-edit-read-targets';
import { useQueryClient } from '@tanstack/react-query';
import { DashboardReadTargets } from '@modules/dashboard/types/dashboard.types';

interface DashboardReadTargetsManagementEditProps {
  readTargets: DashboardReadTargets;
}

const DashboardReadTargetsManagementEdit: React.FC<DashboardReadTargetsManagementEditProps> = (props) => {
  const { readTargets } = props;

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { editReadTargets } = useEditReadTargets({
    onSuccess: async (data) => {
      if (data.data?.readTargets) {
        await queryClient.refetchQueries({ queryKey: ['dashboard-read-targets'] });
        toast({ variant: 'success', content: 'Read Targets edited successfully!' });
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem aria-label="Edit Read Targets" onSelect={(e) => e.preventDefault()}>
          <EditIcon className="mr-2 stroke-current" />
          Update
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Read Targets</DialogTitle>
          <DialogDescription>Edit your read targets here.</DialogDescription>
        </DialogHeader>

        <DashboardReadTargetsEditForm initialData={readTargets.targetReadTargets} onSubmit={editReadTargets} />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardReadTargetsManagementEdit;

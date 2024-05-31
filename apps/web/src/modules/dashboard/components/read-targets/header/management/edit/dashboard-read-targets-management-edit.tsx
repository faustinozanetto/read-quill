import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EditIcon,
  useToast,
} from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadTargetsEditForm from './dashboard-read-targets-management-edit-form';
import { useEditReadTargets } from '@modules/dashboard/hooks/read-targets/use-edit-read-targets';

interface DashboardReadTargetsManagementEditProps {
  readTargets: NonNullable<DashboardReadTargetsGetResponse['result']>;
}

const DashboardReadTargetsManagementEdit: React.FC<DashboardReadTargetsManagementEditProps> = (props) => {
  const { readTargets } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { editReadTargets } = useEditReadTargets({
    onSuccess: async (data) => {
      if (data.targetReadTargets) {
        await queryClient.refetchQueries(['dashboard-read-targets']);
        setDialogOpen(false);
        toast({ variant: 'success', content: 'Read Targets edited successfully!' });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Edit Read Targets" size="sm" variant="outline">
          <EditIcon className="mr-2 stroke-current" />
          Edit Targets
        </Button>
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

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
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadTargetsEditForm from './dashboard-read-targets-management-edit-form';
import type { DashboardReadTargetsManagementEditFormData } from './dashboard-read-targets-management-edit-form';

interface DashboardReadTargetsManagementEditProps {
  readTargets: NonNullable<DashboardReadTargetsGetResponse['result']>;
}

const DashboardReadTargetsManagementEdit: React.FC<DashboardReadTargetsManagementEditProps> = (props) => {
  const { readTargets } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: DashboardReadTargetsManagementEditFormData) => {
      try {
        const url = new URL('/api/dashboard/read-targets', __URL__);
        const body = JSON.stringify({
          ...data,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error('Could not update targets!');
        }

        toast({ variant: 'success', content: 'Read Targets edited successfully!' });
      } catch (error) {
        let errorMessage = 'Could not create edited targets!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async () => {
      await queryClient.refetchQueries(['dashboard-read-targets']);
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

        <DashboardReadTargetsEditForm initialData={readTargets.targetReadTargets} onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardReadTargetsManagementEdit;

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PlusIcon,
  useToast,
} from '@read-quill/design-system';

import DashboardReadTargetsCreateForm, {
  DashboardReadTargetsCreateFormData,
} from './dashboard-read-targets-create-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useMutation } from '@tanstack/react-query';

const DashboardReadTargetsCreate: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: DashboardReadTargetsCreateFormData) => {
      try {
        const url = new URL('/api/dashboard/read-targets', __URL__);
        const body = JSON.stringify({
          ...data,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not update book!');
        }

        toast({ variant: 'success', content: 'Read Targets created successfully!' });
      } catch (error) {
        let errorMessage = 'Could not create read targets!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['dashboard-read-targets-created']);
    },
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Create Read Targets" className="w-full sm:ml-auto sm:w-fit">
          <PlusIcon className="mr-2 stroke-current" />
          Create Read Targets
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Read Targets</DialogTitle>
          <DialogDescription>Setup your read targets here.</DialogDescription>
        </DialogHeader>

        <DashboardReadTargetsCreateForm onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardReadTargetsCreate;

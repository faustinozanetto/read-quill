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
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import DashboardReadTargetsCreateForm from './dashboard-read-targets-create-form';
import { useCreateReadTargets } from '@modules/dashboard/hooks/read-targets/use-create-read-targets';

const DashboardReadTargetsCreate: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { createReadTargets } = useCreateReadTargets({
    onSuccess: async (data) => {
      if (data.success) {
        setDialogOpen(false);
        await queryClient.refetchQueries(['dashboard-read-targets']);
        toast({ variant: 'success', content: 'Read Targets created successfully!' });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Create Read Targets" className="w-full sm:ml-auto sm:w-fit" size="sm">
          <PlusIcon className="mr-2 stroke-current" />
          Create Read Targets
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Read Targets</DialogTitle>
          <DialogDescription>Setup your read targets here.</DialogDescription>
        </DialogHeader>

        <DashboardReadTargetsCreateForm onSubmit={createReadTargets} />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardReadTargetsCreate;

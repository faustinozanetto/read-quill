import React from 'react';
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
import DashboardReadTargetsCreateForm from './dashboard-read-targets-create-form';
import { useCreateReadTargets } from '@modules/dashboard/hooks/read-targets/use-create-read-targets';
import { useQueryClient } from '@tanstack/react-query';

const DashboardReadTargetsCreate: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { createReadTargets } = useCreateReadTargets({
    onSuccess: async (data) => {
      if (data.data?.readTargets) {
        await queryClient.refetchQueries({ queryKey: ['dashboard-read-targets'] });
        toast({ variant: 'success', content: 'Read Targets created successfully!' });
      }
    },
  });

  return (
    <Dialog>
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

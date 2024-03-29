'use client';

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
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import DashboardReadRegistriesCreateForm from './dashboard-read-registries-create-form';
import type { DashboardReadRegistriesCreateFormData } from './dashboard-read-registries-create-form';

const DashboardReadRegistriesCreate: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: DashboardReadRegistriesCreateFormData) => {
      try {
        const url = new URL('/api/dashboard/read-registries', __URL__);
        const body = JSON.stringify({
          ...data,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not create read registry!');
        }

        toast({ variant: 'success', content: 'Read registry created successfully!' });
      } catch (error) {
        let errorMessage = 'Could not create read registry!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['dashboard-read-targets']);
      await queryClient.invalidateQueries(['dashboard-read-registries']);
      await queryClient.invalidateQueries(['dashboard-books-progress']);
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Create Read Registry" className="w-full sm:ml-auto sm:w-fit" size="sm">
          <PlusIcon className="mr-2 stroke-current" />
          Create Read Registry
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Read Registry</DialogTitle>
          <DialogDescription>Register your read pages here.</DialogDescription>
        </DialogHeader>

        <DashboardReadRegistriesCreateForm onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardReadRegistriesCreate;

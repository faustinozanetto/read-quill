'use client';

import React, { useState } from 'react';
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
import { useMutation } from '@tanstack/react-query';
import type { ReadRegistry } from '@read-quill/database';
import type { Row } from '@tanstack/react-table';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardReadRegistryEditForm from './dashboard-read-registry-edit-form';
import type { DashboardReadRegistryEditFormData } from './dashboard-read-registry-edit-form';

interface DashboardReadRegistryEditProps {
  row: Row<ReadRegistry>;
}

const DashboardReadRegistryEdit: React.FC<DashboardReadRegistryEditProps> = (props) => {
  const { row } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: DashboardReadRegistryEditFormData) => {
      try {
        const url = new URL('/api/dashboard/read-registries', __URL__);
        const body = JSON.stringify({
          ...data,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error('Could not edit read registry!');
        }

        toast({ variant: 'success', content: 'Read registry edited successfully!' });
      } catch (error) {
        let errorMessage = 'Could not edit read registry!';
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
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <EditIcon className="mr-2 stroke-current" size="sm" />
          Edit Registry
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Read Registry</DialogTitle>
          <DialogDescription>Edit your read pages here.</DialogDescription>
        </DialogHeader>

        <DashboardReadRegistryEditForm initialData={row.original} onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardReadRegistryEdit;

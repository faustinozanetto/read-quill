'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useToast,
} from '@read-quill/design-system';
import type { ReadRegistry } from '@read-quill/database';
import ReadRegistryEditForm from './read-registry-edit-form';

import { UseEditReadRegistryParams, useEditReadRegistry } from '@modules/read-registries/hooks/use-edit-read-registry';

interface ReadRegistryEditProps {
  readRegistry: ReadRegistry;
  editButton: React.ReactNode;
  onSuccess: UseEditReadRegistryParams['onSuccess'];
}

const ReadRegistryEdit: React.FC<ReadRegistryEditProps> = (props) => {
  const { readRegistry, editButton, onSuccess } = props;

  const { toast } = useToast();

  const { editReadRegistry } = useEditReadRegistry({
    onSuccess: async (data, variables, context) => {
      if (data.data?.readRegistry) {
        await onSuccess(data, variables, context);
        toast({ variant: 'success', content: 'Read registry edited successfully!' });
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{editButton}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Read Registry</DialogTitle>
          <DialogDescription>Edit your read pages here.</DialogDescription>
        </DialogHeader>

        <ReadRegistryEditForm initialData={readRegistry} onSubmit={editReadRegistry} />
      </DialogContent>
    </Dialog>
  );
};

export default ReadRegistryEdit;

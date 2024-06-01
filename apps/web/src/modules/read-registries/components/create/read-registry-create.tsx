'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useToast,
} from '@read-quill/design-system';

import {
  UseCreateReadRegistryParams,
  useCreateReadRegistry,
} from '@modules/read-registries/hooks/use-create-read-registry';
import ReadRegistryCreateForm from './read-registry-create-form';

interface ReadRegistryCreateProps {
  onSuccess: UseCreateReadRegistryParams['onSuccess'];
  createButton: React.ReactNode;
  bookId?: string;
}

const ReadRegistryCreate: React.FC<ReadRegistryCreateProps> = (props) => {
  const { createButton, onSuccess, bookId } = props;

  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { createReadRegistry } = useCreateReadRegistry({
    onSuccess: async (data, variables, context) => {
      if (data && data.readRegistry) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: 'Read registry created successfully!' });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{createButton}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Read Registry</DialogTitle>
          <DialogDescription>Register your read pages here.</DialogDescription>
        </DialogHeader>

        <ReadRegistryCreateForm onSubmit={createReadRegistry} bookId={bookId} />
      </DialogContent>
    </Dialog>
  );
};

export default ReadRegistryCreate;

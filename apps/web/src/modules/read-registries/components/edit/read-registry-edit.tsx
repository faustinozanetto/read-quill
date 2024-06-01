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
import type { ReadRegistry } from '@read-quill/database';
import ReadRegistryEditForm from './read-registry-edit-form';

import { UseEditReadRegistryParams, useEditReadRegistry } from '@modules/read-registries/hooks/use-edit-read-registry';

interface ReadRegistryEditProps {
  readRegistry: ReadRegistry;
  onSuccess: UseEditReadRegistryParams['onSuccess'];
}

const ReadRegistryEdit: React.FC<ReadRegistryEditProps> = (props) => {
  const { readRegistry, onSuccess } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const { editReadRegistry } = useEditReadRegistry({
    onSuccess: async (data, variables, context) => {
      if (data && data.readRegistry) {
        onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: 'Read registry edited successfully!' });
      }
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

        <ReadRegistryEditForm initialData={readRegistry} onSubmit={editReadRegistry} />
      </DialogContent>
    </Dialog>
  );
};

export default ReadRegistryEdit;

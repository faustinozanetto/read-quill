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
import { analytics } from '@modules/analytics/lib/analytics.lib';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

interface ReadRegistryCreateProps {
  onSuccess: UseCreateReadRegistryParams['onSuccess'];
  createButton: React.ReactNode;
  bookId?: string;
}

const ReadRegistryCreate: React.FC<ReadRegistryCreateProps> = (props) => {
  const { createButton, onSuccess, bookId } = props;

  const { user } = useAuthContext();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { createReadRegistry } = useCreateReadRegistry({
    onSuccess: async (data, variables, context) => {
      if (data.data?.readRegistry && user) {
        await onSuccess(data, variables, context);
        analytics.readRegistries.trackCreate(
          {
            user: {
              id: user.id!,
              name: user.name!,
            },
          },
          {
            readRegistry: data.data.readRegistry,
          }
        );
        toast({ variant: 'success', content: 'Read registry created successfully!' });
        setIsDialogOpen(false);
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

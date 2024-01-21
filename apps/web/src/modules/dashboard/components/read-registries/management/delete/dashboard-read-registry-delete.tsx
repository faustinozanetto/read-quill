import React, { useState } from 'react';
import {
  useToast,
  DeleteIcon,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  DropdownMenuItem,
} from '@read-quill/design-system';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ReadRegistry } from '@read-quill/database';
import type { Row } from '@tanstack/react-table';
import { __URL__ } from '@modules/common/lib/common.constants';

interface DashboardReadRegistryDeleteProps {
  row: Row<ReadRegistry>;
}

const DashboardReadRegistryDelete: React.FC<DashboardReadRegistryDeleteProps> = (props) => {
  const { row } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-registries', __URL__);
        const body = JSON.stringify({
          registryId: row.original.id,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete read registry!');
        }

        toast({ variant: 'success', content: 'Read registry deleted successfully!' });
      } catch (error) {
        let errorMessage = 'Could not delete read registry!';
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
    <AlertDialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <DeleteIcon className="mr-2 stroke-current" size="sm" />
          Delete Registry
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Registry</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete it?. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await mutateAsync();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DashboardReadRegistryDelete;

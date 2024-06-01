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
  buttonVariants,
} from '@read-quill/design-system';

import {
  UseDeleteReadRegistriesParams,
  useDeleteReadRegistries,
} from '@modules/read-registries/hooks/use-delete-read-registries';

interface ReadRegistryDeleteMultipleProps {
  registryIds: string[];
  onSuccess: UseDeleteReadRegistriesParams['onSuccess'];
  deleteButton: React.ReactNode;
}

const ReadRegistryDeleteMultiple: React.FC<ReadRegistryDeleteMultipleProps> = (props) => {
  const { registryIds, onSuccess, deleteButton } = props;

  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { deleteReadRegistries } = useDeleteReadRegistries({
    onSuccess: async (data, variables, context) => {
      if (data.success) {
        onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: 'Read registries deleted successfully!' });
      }
    },
  });

  return (
    <AlertDialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <AlertDialogTrigger asChild>{deleteButton}</AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Multiple Registries</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete them?. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={async () => {
              await deleteReadRegistries({ registryIds });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReadRegistryDeleteMultiple;

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
import type { ReadRegistry } from '@read-quill/database';
import {
  UseDeleteReadRegistryParams,
  useDeleteReadRegistry,
} from '@modules/read-registries/hooks/use-delete-read-registry';

interface ReadRegistryDeleteProps {
  readRegistry: ReadRegistry;
  onSuccess: UseDeleteReadRegistryParams['onSuccess'];
}

const ReadRegistryDelete: React.FC<ReadRegistryDeleteProps> = (props) => {
  const { readRegistry, onSuccess } = props;

  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { deleteReadRegistry } = useDeleteReadRegistry({
    onSuccess: async (data, variables, context) => {
      if (data.success) {
        onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: 'Read registry deleted successfully!' });
      }
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
            className={buttonVariants({ variant: 'destructive' })}
            onClick={async () => {
              await deleteReadRegistry({ registryId: readRegistry.id });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReadRegistryDelete;

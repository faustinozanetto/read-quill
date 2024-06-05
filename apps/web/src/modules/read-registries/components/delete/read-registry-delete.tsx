import React from 'react';
import {
  useToast,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  buttonVariants,
  LoadingIcon,
} from '@read-quill/design-system';
import type { ReadRegistry } from '@read-quill/database';
import {
  UseDeleteReadRegistryParams,
  useDeleteReadRegistry,
} from '@modules/read-registries/hooks/use-delete-read-registry';

interface ReadRegistryDeleteProps {
  readRegistry: ReadRegistry;
  deleteButton: React.ReactNode;
  onSuccess: UseDeleteReadRegistryParams['onSuccess'];
}

const ReadRegistryDelete: React.FC<ReadRegistryDeleteProps> = (props) => {
  const { readRegistry, deleteButton, onSuccess } = props;

  const { toast } = useToast();

  const { isPending, deleteReadRegistry } = useDeleteReadRegistry({
    onSuccess: async (data, variables, context) => {
      if (data.data?.success) {
        await onSuccess(data, variables, context);
        toast({ variant: 'success', content: 'Read registry deleted successfully!' });
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{deleteButton}</AlertDialogTrigger>
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
            disabled={isPending}
            onClick={async (e) => {
              e.preventDefault();
              await deleteReadRegistry({ registryId: readRegistry.id });
            }}
          >
            {isPending && <LoadingIcon className="mr-2" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReadRegistryDelete;

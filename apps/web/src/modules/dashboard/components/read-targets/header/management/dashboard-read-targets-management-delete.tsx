import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  DeleteIcon,
  DropdownMenuItem,
  LoadingIcon,
  buttonVariants,
  useToast,
} from '@read-quill/design-system';
import { useDeleteReadTargets } from '@modules/dashboard/hooks/read-targets/use-delete-read-targets';
import { useQueryClient } from '@tanstack/react-query';

const DashboardReadTargetsManagementDelete: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { isPending, deleteReadTargets } = useDeleteReadTargets({
    onSuccess: async (data) => {
      if (data.data?.success) {
        await queryClient.refetchQueries({ queryKey: ['dashboard-read-targets-created'] });
        await queryClient.refetchQueries({ queryKey: ['dashboard-read-targets'] });
        toast({ variant: 'success', content: `Targets deleted successfully!` });
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="focus:bg-destructive focus:text-destructive-foreground"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteIcon className="mr-2 stroke-current" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Read Targets</AlertDialogTitle>
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
              await deleteReadTargets();
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

export default DashboardReadTargetsManagementDelete;

import React, { useState } from 'react';
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
  LoadingIcon,
  buttonVariants,
  useToast,
} from '@read-quill/design-system';

import { useDeleteReferralCode, UseDeleteReferralCodeParams } from '../../hooks/own/use-delete-referral-code';

interface DeleteReferralCodeProps {
  onSuccess: UseDeleteReferralCodeParams['onSuccess'];
  deleteButton: React.ReactNode;
}

const DeleteReferralCode: React.FC<DeleteReferralCodeProps> = (props) => {
  const { deleteButton, onSuccess } = props;

  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const { isPending, deleteReferralCode } = useDeleteReferralCode({
    onSuccess: async (data, variables, context) => {
      if (data.data?.success) {
        await onSuccess(data, variables, context);
        toast({ variant: 'success', content: `Referral code deleted successfully!` });
        setIsOpen(false);
      }
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{deleteButton}</AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Referral Code</AlertDialogTitle>
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
              await deleteReferralCode({});
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

export default DeleteReferralCode;

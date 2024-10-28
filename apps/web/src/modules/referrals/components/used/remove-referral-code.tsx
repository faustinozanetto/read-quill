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
  LoadingIcon,
  buttonVariants,
  useToast,
} from '@read-quill/design-system';

import {
  useRemoveReferralCode,
  UseRemoveReferralCodeParams,
} from '@modules/referrals/hooks/used/use-remove-referral-code';

interface RemoveUsedReferralCodeProps {
  onSuccess: UseRemoveReferralCodeParams['onSuccess'];
  removeButton: React.ReactNode;
}

const RemoveReferralCode: React.FC<RemoveUsedReferralCodeProps> = (props) => {
  const { removeButton, onSuccess } = props;

  const { toast } = useToast();

  const { isPending, removeReferralCode } = useRemoveReferralCode({
    onSuccess: async (data, variables, context) => {
      if (data.data?.success) {
        await onSuccess(data, variables, context);
        toast({ variant: 'success', content: `Referral code deleted successfully!` });
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{removeButton}</AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Referral Code</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove it?. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            disabled={isPending}
            onClick={async (e) => {
              e.preventDefault();
              await removeReferralCode({});
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

export default RemoveReferralCode;

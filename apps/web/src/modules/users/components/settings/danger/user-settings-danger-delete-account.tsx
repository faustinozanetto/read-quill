'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  XIcon,
  Button,
} from '@read-quill/design-system';
import { DeleteIcon } from '@read-quill/design-system';
import { buttonVariants } from '@read-quill/design-system';
import UserSettingsDangerDeleteAccountForm from './user-settings-danger-delete-account-form';
import { Separator } from '@read-quill/design-system';
import { useDeleteUserAccount } from '@modules/users/hooks/use-delete-user-account';
import { useToast } from '@read-quill/design-system';
import { signOut } from 'next-auth/react';

const UserSettingsDangerDeleteAccount: React.FC = () => {
  const { toast } = useToast();

  const { deleteUserAccount } = useDeleteUserAccount({
    onSuccess: async (data) => {
      if (data.data?.success) {
        await signOut({ callbackUrl: '/', redirect: true });
        toast({ variant: 'success', content: `User deleted successfully!` });
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        aria-label="Delete Account"
        className={buttonVariants({
          variant: 'destructive',
        })}
      >
        <DeleteIcon className="mr-2 stroke-current" />
        Delete Account
      </AlertDialogTrigger>
      <AlertDialogContent className="fixed">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <UserSettingsDangerDeleteAccountForm onSubmit={deleteUserAccount} />
        <AlertDialogCancel asChild>
          <Button variant="ghost" className="absolute top-2 right-2 p-1 h-8 w-8">
            <XIcon />
          </Button>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UserSettingsDangerDeleteAccount;

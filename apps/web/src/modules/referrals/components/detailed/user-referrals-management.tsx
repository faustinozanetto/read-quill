'use client';

import React from 'react';
import {
  Button,
  DeleteIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EditIcon,
  ManageIcon,
  PlusIcon,
  Skeleton,
} from '@read-quill/design-system';
import { EditReferralCode } from '../own/edit/edit-referral-code';
import DeleteReferralCode from '../own/delete-referral-code';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import { useUserReferralCode } from '@modules/referrals/hooks/use-user-referral-code';
import { useQueryClient } from '@tanstack/react-query';
import { CreateReferralCode } from '../own/create/create-referral-code';

const UserReferralsManagement: React.FC = () => {
  const { user } = useAuthContext();
  const { data, isLoading } = useUserReferralCode({ userId: user?.id });

  const queryClient = useQueryClient();

  const handleOnCreated = async () => {
    await queryClient.refetchQueries({ queryKey: ['user-referral-code', user?.id] });
  };

  const handleOnEdited = () => {};
  const handleOnDeleted = () => {};

  if (isLoading) return <Skeleton className="h-10 w-10" />;

  if (!data?.data?.referralCode)
    return (
      <CreateReferralCode
        createButton={
          <Button>
            <PlusIcon className="mr-2" /> Create Code
          </Button>
        }
        onSuccess={handleOnCreated}
      />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title="Management" aria-label="Management" size="icon">
          <ManageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuLabel>Manage Referrals</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditReferralCode
          onSuccess={handleOnEdited}
          editButton={
            <DropdownMenuItem aria-label="Update Referral Code" onSelect={(e) => e.preventDefault()}>
              <EditIcon className="mr-2 stroke-current" />
              Update
            </DropdownMenuItem>
          }
        />

        <DeleteReferralCode
          onSuccess={handleOnDeleted}
          deleteButton={
            <DropdownMenuItem
              className="focus:bg-destructive focus:text-destructive-foreground"
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteIcon className="mr-2 stroke-current" />
              Delete
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserReferralsManagement;

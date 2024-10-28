'use client';

import React from 'react';
import { Session } from 'next-auth';
import { Label } from '@read-quill/design-system';

import { useUserReferralCode } from '@modules/referrals/hooks/use-user-referral-code';
import { Skeleton } from '@read-quill/design-system';
import { Button } from '@read-quill/design-system';
import { PlusIcon } from '@read-quill/design-system';

import { useQueryClient } from '@tanstack/react-query';
import UserSettingsReferralOwnEdit from './user-settings-referral-own-edit';
import UserSettingsReferralOwnDelete from './user-settings-referral-own-delete';
import { CreateReferralCode } from '@modules/referrals/components/own/create/create-referral-code';

interface UserSettingsReferralOwnProps {
  session: Session;
}

const UserSettingsReferralOwn: React.FC<UserSettingsReferralOwnProps> = (props) => {
  const { session } = props;

  const { data, isLoading } = useUserReferralCode({
    userId: session.user.id,
  });

  const queryClient = useQueryClient();

  const handleCreateSuccess = async () => {
    await queryClient.refetchQueries({ queryKey: ['user-referral-code', session.user.id] });
  };

  return (
    <div>
      <Label className="block">Your Referral Code</Label>
      {isLoading && <Skeleton className="h-4 w-24" />}
      {!isLoading && !data?.data?.referralCode && (
        <div className="flex flex-wrap justify-between items-start gap-2">
          <p>You have not created a referral code yet, click the button to start!</p>

          <CreateReferralCode
            createButton={
              <Button size="sm" className="ml-auto">
                <PlusIcon className="mr-2" />
                Create Referral Code
              </Button>
            }
            onSuccess={handleCreateSuccess}
          />
        </div>
      )}
      {!isLoading && data?.data?.referralCode && (
        <div className="flex justify-between flex-wrap gap-4">
          <span>{data.data.referralCode}</span>
          <div className="flex gap-2">
            <UserSettingsReferralOwnEdit session={session} />
            <UserSettingsReferralOwnDelete />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserSettingsReferralOwn;

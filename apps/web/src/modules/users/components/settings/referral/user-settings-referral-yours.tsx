'use client';

import React from 'react';
import { Session } from 'next-auth';
import { Label } from '@read-quill/design-system';

import { useUserReferralCode } from '@modules/referrals/hooks/use-user-referral-code';
import { Skeleton } from '@read-quill/design-system';
import { Button } from '@read-quill/design-system';
import { PlusIcon } from '@read-quill/design-system';
import { CreateReferralCode } from '@modules/referrals/components/create/create-referral-code';
import { useQueryClient } from '@tanstack/react-query';

interface UserSettingsReferralYoursProps {
  session: Session;
}

const UserSettingsReferralYours: React.FC<UserSettingsReferralYoursProps> = (props) => {
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
      {!isLoading && data?.data?.referralCode && <span>{data.data.referralCode}</span>}
    </div>
  );
};
export default UserSettingsReferralYours;

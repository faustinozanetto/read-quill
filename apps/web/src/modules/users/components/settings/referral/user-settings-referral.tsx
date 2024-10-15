'use client';

import React from 'react';
import UserSettingsTab from '../user-settings-tab';
import { Session } from 'next-auth';
import { Label } from '@read-quill/design-system';

import { useReferralCode } from '@modules/referrals/hooks/use-referral-code';
import { Skeleton } from '@read-quill/design-system';
import { Button } from '@read-quill/design-system';
import { PlusIcon } from '@read-quill/design-system';
import { CreateReferralCode } from '@modules/referrals/components/create/create-referral-code';

interface UserSettingsReferralProps {
  session: Session;
}

const UserSettingsReferral: React.FC<UserSettingsReferralProps> = (props) => {
  const { session } = props;

  const { data, isLoading } = useReferralCode({
    userId: session.user.id,
  });

  return (
    <UserSettingsTab title="Referral" type="referral">
      <div className="flex flex-col gap-2 mt-2">
        <div>
          <Label className="block mb-2">Referral Code</Label>
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
                onSuccess={() => {}}
              />
            </div>
          )}
          {!isLoading && data?.data?.referralCode && <span>{data.data.referralCode}</span>}
        </div>
      </div>
    </UserSettingsTab>
  );
};
export default UserSettingsReferral;

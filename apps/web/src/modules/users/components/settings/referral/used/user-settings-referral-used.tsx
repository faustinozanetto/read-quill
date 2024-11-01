'use client';

import React from 'react';
import { Session } from 'next-auth';
import { Label } from '@read-quill/design-system';

import { Skeleton } from '@read-quill/design-system';
import { useUsedReferralCode } from '@modules/referrals/hooks/used/use-used-referral-code';
import UserSettingsReferralUsedChange from './user-settings-referral-used-change';
import UserSettingsReferralUsedRemove from './user-settings-referral-used-remove';

interface UserSettingsReferralUsedProps {
  session: Session;
}

const UserSettingsReferralUsed: React.FC<UserSettingsReferralUsedProps> = (props) => {
  const { session } = props;

  const { data, isLoading } = useUsedReferralCode({
    userId: session.user.id,
  });

  return (
    <div>
      <Label className="block">Used Referral Code</Label>
      {isLoading && <Skeleton className="h-4 w-24" />}
      {!isLoading && !data?.data?.usedReferralCode && (
        <div className="flex flex-wrap justify-between items-start gap-2">
          <p>You have not used a referral code yet, click the button to start!</p>
          <UserSettingsReferralUsedChange session={session} />
        </div>
      )}
      {!isLoading && data?.data?.usedReferralCode && (
        <div className="flex justify-between flex-wrap gap-4">
          <span>{data.data.usedReferralCode}</span>
          <div className="flex gap-2">
            <UserSettingsReferralUsedChange session={session} />
            <UserSettingsReferralUsedRemove session={session} />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserSettingsReferralUsed;

'use client';

import React from 'react';
import { Session } from 'next-auth';
import { Label } from '@read-quill/design-system';

import { Skeleton } from '@read-quill/design-system';
import { useUseReferralCode } from '@modules/referrals/hooks/use-use-referral-code';

interface UserSettingsReferralUseProps {
  session: Session;
}

const UserSettingsReferralUse: React.FC<UserSettingsReferralUseProps> = (props) => {
  const { session } = props;

  const { data, isLoading } = useUseReferralCode({
    userId: session.user.id,
  });

  return (
    <div>
      <Label className="block">Used Referral Code</Label>
      {isLoading && <Skeleton className="h-4 w-24" />}
      {!isLoading && !data?.data?.usedReferralCode && (
        <div className="flex flex-wrap justify-between items-start gap-2">
          <p>You have not used a referral code yet, click the button to start!</p>
        </div>
      )}
      {!isLoading && data?.data?.usedReferralCode && <span>{data.data.usedReferralCode}</span>}
    </div>
  );
};
export default UserSettingsReferralUse;

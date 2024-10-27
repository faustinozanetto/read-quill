import React from 'react';
import UserSettingsTab from '../user-settings-tab';
import { Session } from 'next-auth';

import UserSettingsReferralYours from './user-settings-referral-yours';
import UserSettingsReferralUse from './user-settings-referral-use';
import UserSettingsReferralChange from './user-settings-referral-change';

interface UserSettingsReferralProps {
  session: Session;
}

const UserSettingsReferral: React.FC<UserSettingsReferralProps> = (props) => {
  const { session } = props;

  return (
    <UserSettingsTab title="Referral" type="referral">
      <div className="flex flex-col gap-4 mt-2">
        <UserSettingsReferralYours session={session} />
        <div className="flex justify-between flex-wrap gap-4">
          <UserSettingsReferralUse session={session} />
          <UserSettingsReferralChange session={session} />
        </div>
      </div>
    </UserSettingsTab>
  );
};
export default UserSettingsReferral;

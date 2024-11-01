import React from 'react';
import UserSettingsTab from '../user-settings-tab';
import { Session } from 'next-auth';

import UserSettingsReferralOwn from './own/user-settings-referral-own';

import UserSettingsReferralUsed from './used/user-settings-referral-used';

interface UserSettingsReferralProps {
  session: Session;
}

const UserSettingsReferral: React.FC<UserSettingsReferralProps> = (props) => {
  const { session } = props;

  return (
    <UserSettingsTab title="Referral" type="referral">
      <div className="flex flex-col gap-4 mt-2">
        <UserSettingsReferralOwn session={session} />
        <UserSettingsReferralUsed session={session} />
      </div>
    </UserSettingsTab>
  );
};
export default UserSettingsReferral;

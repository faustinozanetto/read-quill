import React from 'react';
import UserSettingsTab from '../user-settings-tab';
import UserSettingsDangerDeleteAccount from './user-settings-danger-delete-account';

const UserSettingsDanger: React.FC = () => {
  return (
    <UserSettingsTab title="Danger" type="danger">
      <p className="mb-2 text-muted-foreground">
        Here, you have the option to permanently delete your account. Please be sure of your decision, as it cannot be
        undone. Proceed with caution!
      </p>
      <div className="flex justify-end">
        <UserSettingsDangerDeleteAccount />
      </div>
    </UserSettingsTab>
  );
};
export default UserSettingsDanger;

import UserAvatar from '@modules/common/components/users/user-avatar';
import { capitalize } from '@modules/common/lib/common.lib';
import { USER_SETTINGS_TABS } from '@modules/users/lib/user-settings.lib';
import { UserSettingsTabType } from '@modules/users/types/user-settings.types';
import { ExclamationIcon, KeyIcon, Tabs, TabsList, TabsTrigger, UserIcon } from '@read-quill/design-system';
import { auth } from 'auth';
import React from 'react';
import UserSettingsDetails from './details/user-settings-details';
import UserSettingsSecurity from './security/user-settings-security';
import UserSettingsDanger from './danger/user-settings-danger';

const UserSettings: React.FC = async () => {
  const session = await auth();
  if (!session) return null;

  const TAB_COMPONENTS: Record<UserSettingsTabType, React.ReactNode> = {
    details: <UserSettingsDetails session={session} />,
    security: <UserSettingsSecurity />,
    danger: <UserSettingsDanger />,
  };

  const TAB_TRIGGER_ICONS: Record<UserSettingsTabType, React.ReactNode> = {
    danger: <ExclamationIcon />,
    security: <KeyIcon />,
    details: <UserIcon />,
  };

  return (
    <div className="mx-auto flex flex-col gap-4 max-w-6xl container my-4">
      <div className="border rounded-lg p-4 flex items-center gap-4">
        <UserAvatar image={session.user.image} name={session.user.name} width={250} height={250} alt="User Avatar" />
        <h1 className="text-xl sm:text-2xl font-bold">Account Settings</h1>
      </div>

      <Tabs defaultValue="details" className="w-full flex-col sm:flex-row flex gap-4">
        <TabsList className="sm:flex-col sm:h-fit w-full sm:max-w-48">
          {USER_SETTINGS_TABS.map((settingsTab) => {
            return (
              <TabsTrigger
                key={settingsTab}
                className="w-full sm:h-10 data-[state=active]:bg-primary/70 data-[state=active]:text-primary-foreground gap-2 justify-start"
                value={settingsTab}
              >
                {TAB_TRIGGER_ICONS[settingsTab]}
                {capitalize(settingsTab)}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="border p-4 rounded-lg shadow flex-1">
          {USER_SETTINGS_TABS.map((settingsTab) => TAB_COMPONENTS[settingsTab])}
        </div>
      </Tabs>
    </div>
  );
};
export default UserSettings;

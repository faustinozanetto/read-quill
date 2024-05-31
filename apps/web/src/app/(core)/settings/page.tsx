import UserSettings from '@modules/users/components/settings/user-settings';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Account Settings',
};

const SettingsPage: React.FC = async () => {
  return <UserSettings />;
};

export default SettingsPage;

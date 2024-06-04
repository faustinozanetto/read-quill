import UserSettings from '@modules/users/components/settings/user-settings';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Account Settings',
  description:
    'Manage your ReadQuill account settings to personalize your reading experience. Update your profile, adjust preferences, and secure your account. Ensure your literary journey is tailored to your needs with our comprehensive settings.',
};

const SettingsPage: React.FC = () => {
  return <UserSettings />;
};

export default SettingsPage;

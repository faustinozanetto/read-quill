import React from 'react';
import AuthCompleteProfile from '@modules/auth/components/complete-profile/auth-complete-profile';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Complete Profile',
  description:
    'Manage your ReadQuill account settings to personalize your reading experience. Update your profile, adjust preferences, and secure your account. Ensure your literary journey is tailored to your needs with our comprehensive settings.',
};

const AuthCompleteProfilePage: React.FC = () => {
  return (
    <SessionProvider>
      <AuthCompleteProfile />
    </SessionProvider>
  );
};

export default AuthCompleteProfilePage;

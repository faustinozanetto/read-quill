import UserReferrals from '@modules/referrals/components/detailed/user-referrals';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Account Referrals',
  description:
    'Manage your ReadQuill account settings to personalize your reading experience. Update your profile, adjust preferences, and secure your account. Ensure your literary journey is tailored to your needs with our comprehensive settings.',
};

const ReferralsPage: React.FC = () => {
  return <UserReferrals />;
};

export default ReferralsPage;

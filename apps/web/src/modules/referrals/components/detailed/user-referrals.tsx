import React from 'react';
import UserReferralsManagement from './user-referrals-management';
import UserReferralsReferred from './referred/user-referrals-referred';

const UserReferrals: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col rounded-lg border p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Referrals</h1>
          <UserReferralsManagement />
        </div>
        <p>Welcome to your referral hub! Here, you can view all the people you've referred.</p>
      </div>

      <UserReferralsReferred />
    </div>
  );
};

export default UserReferrals;

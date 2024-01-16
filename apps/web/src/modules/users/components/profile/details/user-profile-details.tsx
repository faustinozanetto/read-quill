'use client';

import React from 'react';
import { useUserProfileStore } from '@modules/users/state/user-profile.slice';
import UserProfileAvatar from './avatar/user-profile-avatar';
import UserProfileDetailsPlaceHolder from './user-profile-details-placeholder';

const UserProfileDetails: React.FC = () => {
  const { user, isLoading } = useUserProfileStore();

  if (isLoading) return <UserProfileDetailsPlaceHolder />;

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      {user?.image ? <UserProfileAvatar avatarUrl={user.image} /> : null}
      <div className="flex-1 flex-col">
        <h1 className="mb-1 text-2xl font-bold md:text-3xl">{user?.name ?? 'Name'}</h1>
      </div>
    </div>
  );
};

export default UserProfileDetails;

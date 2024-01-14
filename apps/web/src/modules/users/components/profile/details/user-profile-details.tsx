'use client';

import React from 'react';

import UserProfileAvatar from './avatar/user-profile-avatar';
import { useUserProfileStore } from '@modules/users/state/user-profile.slice';
import { Skeleton } from '@read-quill/design-system';

const UserProfileDetails: React.FC = () => {
  const { user, isLoading } = useUserProfileStore();

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      {isLoading ? <Skeleton className="h-32 w-32 md:h-36 md:w-36" /> : <UserProfileAvatar avatarUrl={user?.image!} />}
      <div className="flex-1 flex-col">
        {isLoading ? (
          <Skeleton className="h-6 w-1/3" />
        ) : (
          <h1 className="mb-1 text-2xl font-bold md:text-3xl">{user?.name!}</h1>
        )}
      </div>
    </div>
  );
};

export default UserProfileDetails;

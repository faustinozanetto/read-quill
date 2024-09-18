'use client';

import React from 'react';
import UserProfileAvatar from './avatar/user-profile-avatar';
import { useUserContext } from '@modules/users/hooks/use-user-context';
import UserProfileDetailsAchievements from './achievements/user-profile-details-achievements';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';

const UserProfileDetails: React.FC = () => {
  const { user } = useUserContext((s) => s);

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      {user.avatar?.path ? (
        <UserProfileAvatar avatarUrl={getImagePublicUrl('UserAvatars', user.avatar?.path!)} />
      ) : null}
      <div className="flex-1 flex-col">
        <h1 className="text-2xl font-bold md:text-3xl">{user?.name ?? 'Name'}</h1>
        <p className="mb-2">
          Joined ReadQuill{' '}
          <span className="font-medium">
            {new Date(user.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
          </span>
        </p>
        <UserProfileDetailsAchievements />
      </div>
    </div>
  );
};

export default UserProfileDetails;

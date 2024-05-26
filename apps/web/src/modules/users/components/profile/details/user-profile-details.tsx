'use client';

import React from 'react';
import UserProfileAvatar from './avatar/user-profile-avatar';
import { useUserContext } from '@modules/users/hooks/use-user-context';

const UserProfileDetails: React.FC = () => {
  const { user } = useUserContext((s) => s);

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      {user.image ? <UserProfileAvatar avatarUrl={user.image} /> : null}
      <div className="flex-1 flex-col">
        <h1 className="mb-1 text-2xl font-bold md:text-3xl">{user?.name ?? 'Name'}</h1>
      </div>
    </div>
  );
};

export default UserProfileDetails;

'use client';

import React from 'react';

import UserProfileAvatar from './avatar/user-profile-avatar';
import { Skeleton } from '@read-quill/design-system';
import { User } from '@read-quill/database';

interface UserProfileDetailsProps {
  user: User;
}

const UserProfileDetails: React.FC<UserProfileDetailsProps> = (props) => {
  const { user } = props;

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      <UserProfileAvatar avatarUrl={user?.image!} />
      <div className="flex-1 flex-col">
        <h1 className="mb-1 text-2xl font-bold md:text-3xl">{user?.name ?? 'Name'}</h1>
      </div>
    </div>
  );
};

export default UserProfileDetails;

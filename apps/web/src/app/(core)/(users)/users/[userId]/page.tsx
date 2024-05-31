import React from 'react';
import type { User } from '@read-quill/database';
import UserProfile from '@modules/users/components/profile/user-profile';
import { __URL__ } from '@modules/common/lib/common.constants';
import { UserGetResponse } from '@modules/api/types/users-api.types';
import { notFound } from 'next/navigation';

interface UserPageProps {
  params: {
    userId: string;
  };
}

const fetchUserData = async (userId: string): Promise<User | null> => {
  try {
    const url = new URL('/api/user', __URL__);
    url.searchParams.set('userId', userId);

    const response = await fetch(url.toString(), { method: 'GET' });
    if (!response.ok) {
      return null;
    }

    const resData = (await response.json()) as UserGetResponse;
    return resData.user;
  } catch (error) {
    return null;
  }
};

const UserPage: React.FC<UserPageProps> = async (props) => {
  const { params } = props;
  const { userId } = params;

  const user = await fetchUserData(userId);

  if (!user) {
    return notFound();
  }

  return (
    <div className="container my-4">
      <UserProfile user={user} />
    </div>
  );
};

export default UserPage;

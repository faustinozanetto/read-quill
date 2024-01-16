'use client';

import React from 'react';
import type { User } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import UserProfile from '@modules/users/components/profile/user-profile';
import { useUserProfileStore } from '@modules/users/state/user-profile.slice';
import { __URL__ } from '@modules/common/lib/common.constants';

interface UserPageProps {
  params: {
    userId: string;
  };
}

const UserPage: React.FC<UserPageProps> = (props) => {
  const { params } = props;
  const { userId } = params;

  const { setUser, setIsLoading } = useUserProfileStore();

  useQuery<User>(['user-page', userId], {
    queryFn: async () => {
      const url = new URL('/api/users', __URL__);
      url.searchParams.set('userId', userId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user!');
      }

      const { user }: { user: User } = await response.json();
      return user;
    },
    onSuccess(data) {
      setIsLoading(false);
      setUser(data);
    },
    onError() {
      setIsLoading(false);
    },
  });

  return (
    <div className="container my-4">
      <UserProfile />
    </div>
  );
};

export default UserPage;

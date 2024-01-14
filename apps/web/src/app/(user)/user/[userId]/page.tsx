'use client';

import React from 'react';
import UserProfile from '@modules/users/components/profile/user-profile';
import { User } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import { useUserProfileStore } from '@modules/users/state/user-profile.slice';

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
      const url = new URL('/api/user', process.env.NEXT_PUBLIC_URL);
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
    onError(err) {
      setIsLoading(false);
    },
  });

  return <UserProfile />;
};

export default UserPage;

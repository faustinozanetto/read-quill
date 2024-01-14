'use client';

import React from 'react';
import UserProfile from '@modules/users/components/profile/user-profile';
import { User } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import UserProfilePlaceholder from '@modules/users/components/profile/user-profile-placeholder';

interface UserPageProps {
  params: {
    userId: string;
  };
}

const UserPage: React.FC<UserPageProps> = (props) => {
  const { params } = props;
  const { userId } = params;

  const { isPending, isError, data, error } = useQuery<User>({
    queryKey: ['user-page', userId],
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
  });

  if (isPending) return <UserProfilePlaceholder />;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <UserProfile user={data} />;
};

export default UserPage;

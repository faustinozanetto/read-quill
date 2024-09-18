import React from 'react';
import { notFound } from 'next/navigation';
import { UserProvider } from '@modules/users/components/state/user-provider';
import UserProfileDetails from '@modules/users/components/profile/details/user-profile-details';
import { UserGetResponse } from '@modules/api/types/users-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';

interface UserPageLayoutProps {
  params: {
    userId: string;
  };
  children: React.ReactNode;
}

const fetchUserData = async (userId: string): Promise<UserGetResponse | undefined> => {
  try {
    const url = new URL('/api/user', __URL__);
    url.searchParams.set('userId', userId);

    const response = await fetch(url.toString(), { method: 'GET', cache: 'no-store' });

    return response.json();
  } catch (error) {
    return undefined;
  }
};

export default async function UserProfileLayout(props: UserPageLayoutProps) {
  const { children, params } = props;
  const { userId } = params;

  const userData = await fetchUserData(userId);

  if (!userData?.data?.user) {
    return notFound();
  }

  return (
    <UserProvider user={userData.data.user}>
      <section className="mx-auto flex max-w-6xl flex-col gap-4">
        <UserProfileDetails />
        {children}
      </section>
    </UserProvider>
  );
}

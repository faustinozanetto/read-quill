import React from 'react';
import { prisma, type User } from '@read-quill/database';
import UserProfile from '@modules/users/components/profile/user-profile';
import { __URL__ } from '@modules/common/lib/common.constants';
import { UserGetResponse } from '@modules/api/types/users-api.types';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

interface UserPageProps {
  params: {
    userId: string;
  };
}

export async function generateMetadata({ params }: UserPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const userId = params.userId;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return {};

  const title = user.name!;
  const description = `"Explore ${title}'s literary world on ReadQuill. Discover their reading progress, favorite books, and insightful reviews. Dive into ${title}'s engaging threads to join discussions and share thoughts on various literary topics. `;
  const previousImages = (await parent).openGraph?.images || [];
  const image = user.image ?? previousImages;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [...image],
    },
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

  return <UserProfile user={user} />;
};

export default UserPage;

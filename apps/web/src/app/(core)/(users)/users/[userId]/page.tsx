import React from 'react';
import { prisma } from '@read-quill/database';
import UserProfile from '@modules/users/components/profile/user-profile';
import { __URL__ } from '@modules/common/lib/common.constants';
import { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@config/config';

interface UserPageProps {
  params: {
    userId: string;
  };
}

export async function generateMetadata({ params }: UserPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const userId = params.userId;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return {};

  const title = `${user.name!} | ${siteConfig.name}`;
  const description = `Explore the profile of this avid reader. Discover their favorite books, achievements, and contributions to the community. Get insights into their reading habits and literary interests. Visit their public profile now!`;
  const previousImages = (await parent).openGraph?.images || [];
  const images = user.image ? [user.image] : [...previousImages];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      images,
    },
  };
}

const UserPage: React.FC<UserPageProps> = async () => {
  return <UserProfile />;
};

export default UserPage;

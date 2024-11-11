import React from 'react';

import { prisma } from '@read-quill/database';
import { ResolvingMetadata, Metadata } from 'next';
import { siteConfig } from '@config/config';
import { UserProfileDedicatedAchievements } from '@modules/users/components/profile/dedicated/achievements/user-profile-dedicated-achievements';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';

interface UserAchievementsPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export async function generateMetadata(
  { params }: UserAchievementsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const userId = (await params).userId;

  const user = await prisma.user.findUnique({ where: { id: userId }, include: { avatar: true } });
  if (!user) return {};

  const title = `${user.name!} Achievements | ${siteConfig.name}`;
  const description = `Discover the achievements of this dedicated reader. See the milestones they've reached and the badges they've earned through their reading journey. Explore their accomplishments and get inspired by their dedication. Visit their achievements page now!`;
  const previousImages = (await parent).openGraph?.images || [];
  const avatar = user.avatar ? getImagePublicUrl('UserAvatars', user.avatar.path) : null;
  const images = avatar ? [avatar] : [...previousImages];

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

const UserAchievementsPage: React.FC<UserAchievementsPageProps> = async () => {
  return <UserProfileDedicatedAchievements />;
};

export default UserAchievementsPage;

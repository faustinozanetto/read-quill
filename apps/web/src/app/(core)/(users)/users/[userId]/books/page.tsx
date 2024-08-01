import React from 'react';

import { UserProfileDedicatedBooks } from '@modules/users/components/profile/dedicated/books/user-profile-dedicated-books';
import { prisma } from '@read-quill/database';
import { ResolvingMetadata, Metadata } from 'next';
import { siteConfig } from '@config/config';

interface UserBooksPageProps {
  params: {
    userId: string;
  };
}

export async function generateMetadata({ params }: UserBooksPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const userId = params.userId;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return {};

  const title = `${user.name!} Books | ${siteConfig.name}`;
  const description = `Explore the curated bookshelf of this avid reader. Discover the books they've added, organized, and enjoyed. Dive into their literary adventures and find new titles and genres to explore. Visit their public bookshelf now!`;
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
    twitter: {
      title,
      description,
      images: [...image],
    },
  };
}

const UserBooksPage: React.FC<UserBooksPageProps> = async () => {
  return <UserProfileDedicatedBooks />;
};

export default UserBooksPage;

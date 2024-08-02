import React from 'react';
import UserBook from '@modules/books/components/user/user-book';
import { __URL__ } from '@modules/common/lib/common.constants';
import { notFound } from 'next/navigation';
import { ResolvingMetadata, Metadata } from 'next';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { siteConfig } from '@config/config';

interface UserBookPageProps {
  params: {
    bookId: string;
  };
}

export async function generateMetadata({ params }: UserBookPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const bookId = params.bookId;

  const book = await prisma.book.findUnique({ where: { id: bookId }, include: { image: true } });
  if (!book) return {};

  const bookImage = getImagePublicUrl('BookCovers', book.image.path);
  const title = `${book.name}, ${book.author} | ${siteConfig.name}`;

  return {
    title,
    openGraph: {
      title,
      images: [bookImage],
    },
    twitter: {
      title,
      images: [bookImage],
    },
  };
}

const UserBookPage: React.FC<UserBookPageProps> = async (props) => {
  const { params } = props;
  const { bookId } = params;

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    return notFound();
  }

  const session = await auth();
  const isBookOwner = session?.user.id === book?.readerId;

  return <UserBook bookId={bookId} isBookOwner={isBookOwner} />;
};

export default UserBookPage;

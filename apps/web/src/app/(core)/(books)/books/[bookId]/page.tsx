import React from 'react';
import UserBook from '@modules/books/components/user/user-book';
import { __URL__ } from '@modules/common/lib/common.constants';
import { notFound, redirect } from 'next/navigation';
import { ResolvingMetadata, Metadata } from 'next';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';

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
  const title = `${book.name}, ${book.author}`;

  return {
    title,
    openGraph: {
      title,
      images: [bookImage],
    },
  };
}

const UserBookPage: React.FC<UserBookPageProps> = async (props) => {
  const { params } = props;
  const { bookId } = params;

  const bookCount = await prisma.book.count({ where: { id: bookId } });
  if (bookCount === 0) {
    return notFound();
  }

  const session = await auth();
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  const isBookOwner = session?.user.id === book?.readerId;

  return <UserBook bookId={bookId} isBookOwner={isBookOwner} />;
};

export default UserBookPage;

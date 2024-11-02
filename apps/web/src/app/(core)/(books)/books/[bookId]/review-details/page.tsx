import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import { notFound } from 'next/navigation';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import UserBookReviewDetails from '@modules/books/components/user/review/details/user-book-review-details';
import { Metadata } from 'next';

interface UserBookReviewDetailsPageProps {
  params: {
    bookId: string;
  };
}

export const metadata: Metadata = {
  title: 'Book Review Details',
};

const UserBookReviewDetailsPage: React.FC<UserBookReviewDetailsPageProps> = async (props) => {
  const { params } = props;
  const { bookId } = params;

  const session = await auth();
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  const isBookOwner = session?.user.id === book?.readerId;
  if (!isBookOwner) {
    return notFound();
  }

  return <UserBookReviewDetails bookId={bookId} />;
};

export default UserBookReviewDetailsPage;

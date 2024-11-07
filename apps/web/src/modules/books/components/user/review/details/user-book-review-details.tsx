'use client';

import { useFetchBook } from '@modules/books/hooks/use-fetch-book';
import React from 'react';
import UserBookReviewDetailsLikes from './likes/user-book-review-details-likes';
import { Button, ArrowLeftIcon } from '@read-quill/design-system';
import Link from 'next/link';

const UserBookReviewDetails: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* <Button asChild variant="link" className="mr-auto">
        <Link href={`/books/${bookId}`} title="Back to Book Page">
          <ArrowLeftIcon /> Back to Book
        </Link>
      </Button> */}
      <UserBookReviewDetailsLikes />
    </div>
  );
};

export default UserBookReviewDetails;

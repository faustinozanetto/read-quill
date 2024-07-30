import React from 'react';

import { DashboardLastReadEntry } from '@modules/dashboard/types/dashboard.types';
import UserBookCover from '@modules/books/components/user/details/cover/user-book-cover';
import { Button } from '@read-quill/design-system';
import Link from 'next/link';

interface DashboardLastReadCardProps {
  lastRead: DashboardLastReadEntry;
}

const DashboardLastReadCard: React.FC<DashboardLastReadCardProps> = (props) => {
  const { lastRead } = props;
  const { book, date } = lastRead;

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col h-fit shrink-0">
      <UserBookCover
        className="h-32 md:h-36 lg:h-40 mb-2"
        image={book.image}
        placeholderImage={book.placeholderImage}
      />
      <h2 className="font-semibold">{book.name}</h2>
      <p className="text-sm">
        Last read on{' '}
        <span className="font-medium">{new Date(date).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
      </p>
      <Button variant="link" className="ml-auto w-fit" asChild>
        <Link href={`/books/${book.id}`} title="Goto Book Page">
          Goto Book Page{' '}
        </Link>
      </Button>
    </div>
  );
};

export default DashboardLastReadCard;

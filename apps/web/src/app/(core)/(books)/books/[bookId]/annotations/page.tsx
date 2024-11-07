import React from 'react';

import UserBookAnnotationsDetails from '@modules/books/components/user/annotations/details/user-book-annotations-details';
import { Metadata } from 'next';
import UserBookAnnotationsTime from '@modules/books/components/user/annotations/details/time/user-book-annotations-time';

export const metadata: Metadata = {
  title: 'Book Annotations',
};

const UserBookAnnotationsPage: React.FC = async () => {
  return (
    <div className="flex flex-col gap-4">
      <UserBookAnnotationsDetails />
      <UserBookAnnotationsTime />
    </div>
  );
};

export default UserBookAnnotationsPage;

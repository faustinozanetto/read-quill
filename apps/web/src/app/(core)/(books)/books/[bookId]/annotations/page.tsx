import React from 'react';

import UserBookAnnotationsDetails from '@modules/books/components/user/annotations/details/user-book-annotations-details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Annotations',
};

const UserBookAnnotationsPage: React.FC = async () => {
  return <UserBookAnnotationsDetails />;
};

export default UserBookAnnotationsPage;

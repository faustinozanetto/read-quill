import React from 'react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import UserBookAnnotationManagement from './management/user-book-annotations-management';

const UserBookAnnotationsHeader: React.FC = () => {
  const { data: session } = useSession();
  const { book, isLoading } = useBookStore();

  const isBookOwner = Boolean(session?.user && book?.reader && book.reader.email === session.user.email);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
      <h2 className="text-2xl font-bold">Annotations</h2>

      {isLoading ? <Skeleton className="h-10 w-full md:w-36" /> : null}

      {!isLoading && isBookOwner ? <UserBookAnnotationManagement /> : null}
    </div>
  );
};

export default UserBookAnnotationsHeader;

import React from 'react';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import UserBookAnnotationsManagement from './management/user-book-annotations-management';
import { useBookContext } from '@modules/books/hooks/use-book-context';

interface UserBookAnnotationsHeaderProps {
  showManageLink?: boolean;
}

const UserBookAnnotationsHeader: React.FC<UserBookAnnotationsHeaderProps> = (props) => {
  const { showManageLink = true } = props;

  const { book } = useBookContext();
  const { isBookOwner } = useIsBookOwner();

  return (
    <div className="flex items-center justify-between gap-2">
      <h2 className="text-2xl font-bold">📝 Annotations</h2>

      {isBookOwner && book ? <UserBookAnnotationsManagement bookId={book.id} showManageLink={showManageLink} /> : null}
    </div>
  );
};

export default UserBookAnnotationsHeader;

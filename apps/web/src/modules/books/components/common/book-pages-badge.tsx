import React from 'react';
import type { Book } from '@read-quill/database';
import { Badge } from '@read-quill/design-system';

interface BookPagesBadgeProps {
  pageCount: Book['pageCount'];
}

const BookPagesBadge: React.FC<BookPagesBadgeProps> = (props) => {
  const { pageCount } = props;

  return <Badge>{pageCount} pages</Badge>;
};

export default BookPagesBadge;

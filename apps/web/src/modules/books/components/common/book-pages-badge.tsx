import React from 'react';
import type { Book } from '@read-quill/database';
import type { BadgeProps } from '@read-quill/design-system';
import { Badge } from '@read-quill/design-system';

interface BookPagesBadgeProps extends BadgeProps {
  pageCount: Book['pageCount'];
}

const BookPagesBadge: React.FC<BookPagesBadgeProps> = (props) => {
  const { pageCount, ...rest } = props;

  return <Badge {...rest}>{pageCount} pages</Badge>;
};

export default BookPagesBadge;

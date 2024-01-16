import React from 'react';
import type { Book } from '@read-quill/database';
import type { BadgeProps } from '@read-quill/design-system';
import { Badge } from '@read-quill/design-system';

interface BookLanguageBadgeProps extends BadgeProps {
  language: Book['language'];
}

const BookLanguageBadge: React.FC<BookLanguageBadgeProps> = (props) => {
  const { language, ...rest } = props;

  return <Badge {...rest}>{language}</Badge>;
};

export default BookLanguageBadge;

import React from 'react';

import { ThreadWithAuthor } from '@modules/community/types/community.types';
import { Badge } from '@read-quill/design-system';

interface CommunityThreadKeywordsProps {
  keywords: ThreadWithAuthor['keywords'];
}

const CommunityThreadKeywords: React.FC<CommunityThreadKeywordsProps> = (props) => {
  const { keywords } = props;

  return (
    <div className="space-x-2">
      {keywords.split(',').map((keyword) => (
        <Badge key={keyword} size="xs">
          {keyword}
        </Badge>
      ))}
    </div>
  );
};

export default CommunityThreadKeywords;
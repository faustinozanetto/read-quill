import React from 'react';

import { ThreadWithDetails } from '@modules/community/types/community.types';
import { Badge } from '@read-quill/design-system';

interface CommunityThreadKeywordsProps {
  keywords: ThreadWithDetails['keywords'];
}

const CommunityThreadKeywords: React.FC<CommunityThreadKeywordsProps> = (props) => {
  const { keywords } = props;

  return (
    <div className="flex gap-0.5 flex-wrap">
      {keywords.split(',').map((keyword) => (
        <Badge key={keyword}>{keyword}</Badge>
      ))}
    </div>
  );
};

export default CommunityThreadKeywords;

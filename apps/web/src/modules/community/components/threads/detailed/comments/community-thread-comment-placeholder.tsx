import React from 'react';

import { Skeleton } from '@read-quill/design-system';

const CommunityThreadCommentPlaceholder: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="py-2.5 px-4 border rounded-lg shadow flex flex-col">
        <div className="space-y-1 grow">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-12 w-12 aspect-square rounded-full" />
            <div className="flex flex-col sm:items-center gap-1 sm:flex-row grow">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};

export default CommunityThreadCommentPlaceholder;

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const CommunityTopUserCardPlaceholder: React.FC = () => {
  return (
    <div className="border rounded-lg h-40 flex flex-col">
      <Skeleton className="rounded-t-lg r rounded-b-none w-full flex-1" />
      <Skeleton className="h-4 w-1/2 mx-auto my-1" />
      <Skeleton className="h-4 w-1/3 mx-auto" />
    </div>
  );
};

export default CommunityTopUserCardPlaceholder;

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const CommunityThreadCardPlaceholder: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow hover:scale-[101%] transition-transform">
      <div className="flex gap-2 items-center mb-1">
        <Skeleton className="h-12 w-12 aspect-square rounded-full" />
        <div className="w-full space-y-1">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/5" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-1.5">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/5 ml-auto" />
      </div>
      <Skeleton className="h-16 w-full" />
    </div>
  );
};

export default CommunityThreadCardPlaceholder;

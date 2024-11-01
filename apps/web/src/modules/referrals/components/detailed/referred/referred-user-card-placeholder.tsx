import { Skeleton } from '@read-quill/design-system';
import React from 'react';

const ReferredUserCardPlaceholder: React.FC = () => {
  return (
    <div className="flex gap-4 items-center rounded-lg border p-2.5">
      <Skeleton className="rounded-full h-14 w-14" />
      <div className="space-y-2 w-2/4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};

export default ReferredUserCardPlaceholder;

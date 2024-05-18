import { Skeleton } from '@read-quill/design-system';
import React from 'react';

const CommunityThreadPlaceholder: React.FC = () => {
  return (
    <section className="mx-auto flex flex-col gap-4">
      <div className="p-4 border rounded-lg shadow flex flex-col">
        <Skeleton className="h-8 w-full my-4 md:my-8" />
        <div className="flex gap-2 mb-2 justify-between items-center">
          <Skeleton className="h-14 w-6" />
          <Skeleton className="rounded-full h-12 w-12" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
        <Skeleton className="h-5 w-1/4 mb-2" />
        <Skeleton className="h-20 w-full" />
      </div>
    </section>
  );
};

export default CommunityThreadPlaceholder;

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const BookCardPlaceholder: React.FC = () => {
  return (
    <div className="rounded-lg border flex flex-col gap-1">
      <Skeleton className="h-36 w-full rounded-t-lg" />
      <div className="p-2.5 space-y-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default BookCardPlaceholder;

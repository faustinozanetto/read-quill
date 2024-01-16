import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const BookCardPlaceholder: React.FC = () => {
  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-1">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-1/5" />
    </div>
  );
};

export default BookCardPlaceholder;

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const BookAnnotationCardPlaceholder: React.FC = () => {
  return (
    <div className="rounded-lg border p-4 shadow flex flex-col">
      <div className="flex justify-between mb-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="w-full h-10 mb-1" />
      <Skeleton className="w-full h-10" />
    </div>
  );
};

export default BookAnnotationCardPlaceholder;

import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const UserBookDetailsPlaceholder: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
      <Skeleton className="h-80 md:h-[400px] md:w-60" />
      <div className="flex-1 flex-col">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-10" />
        </div>
        <Skeleton className="mb-2 h-6 w-1/3" />
        <Skeleton className="h-4 w-1/5" />
      </div>
    </div>
  );
};

export default UserBookDetailsPlaceholder;

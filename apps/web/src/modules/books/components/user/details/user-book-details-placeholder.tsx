import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const UserBookDetailsPlaceholder: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-4 md:flex-row md:gap-4 border">
      <Skeleton className="h-80 w-full lg:h-[350px] md:h-[250px] md:w-40 lg:w-60" />
      <div className="flex-1 flex-col relative">
        <Skeleton className="mb-2 h-8 w-[80%]" />
        <Skeleton className="mb-2 h-10 w-10 absolute top-0 right-0" />
        <Skeleton className="mb-2 h-6 w-1/2" />
        <Skeleton className="mb-2 h-5 w-1/3" />
        <div className="flex justify-between md:justify-start md:gap-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default UserBookDetailsPlaceholder;

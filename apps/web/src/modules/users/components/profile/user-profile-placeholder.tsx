import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const UserProfilePlaceholder: React.FC = () => {
  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 md:px-4 lg:px-6">
      <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow md:flex-row md:gap-4 border">
        <Skeleton className="h-32 w-32 md:h-36 md:w-36" />
        <div className="flex-1 flex-col">
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
    </section>
  );
};

export default UserProfilePlaceholder;

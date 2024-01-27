import React from 'react';
import { Skeleton } from '@read-quill/design-system';

const UserUnLockedAchievementCardPlaceholder: React.FC = () => {
  return (
    <div className="rounded-lg border p-2.5 shadow flex flex-col items-center justify-start text-center gap-2">
      <Skeleton className="h-14 w-14" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <div className="flex gap-2 w-1/2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default UserUnLockedAchievementCardPlaceholder;

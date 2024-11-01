import React from 'react';

import { Skeleton } from '@read-quill/design-system';

const DashboardReadStreakCardPlaceholder: React.FC = () => {
  return (
    <div className="rounded-lg border p-4 space-y-2 h-fit shrink-0 w-52">
      <Skeleton className="h-20 w-20 mx-auto" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-2/4" />
    </div>
  );
};

export default DashboardReadStreakCardPlaceholder;

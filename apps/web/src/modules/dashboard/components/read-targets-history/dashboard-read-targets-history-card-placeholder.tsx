import React from 'react';
import { Separator, Skeleton } from '@read-quill/design-system';

const DashboardReadTargetsHistoryCardPlaceholder: React.FC = () => {
  return (
    <div className="p-1 border rounded-lg shadow flex flex-col text-center font-medium items-center">
      <Skeleton className="h-20 w-20" />
      <Separator className="my-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export default DashboardReadTargetsHistoryCardPlaceholder;

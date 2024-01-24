import React from 'react';
import type { ReadTargets } from '@read-quill/database';
import { Skeleton } from '@read-quill/design-system';
import { dashboardReadTargets } from '@modules/dashboard/types/dashboard.types';
import DashboardReadTargetsCard from './dashboard-read-targets-card';

interface DashboardReadTargetsFeedProps {
  isLoading: boolean;
  targetReadTargets: Omit<ReadTargets, 'id' | 'userId'> | undefined;
  readTargets: Omit<ReadTargets, 'id' | 'userId'> | undefined;
}

const DashboardReadTargetsFeed: React.FC<DashboardReadTargetsFeedProps> = (props) => {
  const { isLoading, readTargets, targetReadTargets } = props;

  return (
    <div className="grid gap-2 md:grid-cols-3 mt-2">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={`dashboard-read-target-placeholder-${i}`} />
          ))
        : null}

      {readTargets && targetReadTargets
        ? dashboardReadTargets.map((type) => {
            return (
              <DashboardReadTargetsCard
                key={`dashboard-read-target-${type}`}
                target={targetReadTargets[type]}
                type={type}
                value={readTargets[type]}
              />
            );
          })
        : null}
    </div>
  );
};

export default DashboardReadTargetsFeed;

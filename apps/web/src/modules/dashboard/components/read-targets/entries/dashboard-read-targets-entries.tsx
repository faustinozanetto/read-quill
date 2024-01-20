'use client';

import React from 'react';
import DashboardReadTargetsCard from './dashboard-read-targets-card';
import { ReadTargets } from '@read-quill/database';
import { Skeleton } from '@read-quill/design-system';
import { dashboardReadTargets } from '@modules/dashboard/types/dashboard.types';

interface DashboardReadTargetsEntriesProps {
  isLoading: boolean;
  targetReadTargets: Omit<ReadTargets, 'id' | 'userId'> | undefined;
  readTargets: Omit<ReadTargets, 'id' | 'userId'> | undefined;
}

const DashboardReadTargetsEntries: React.FC<DashboardReadTargetsEntriesProps> = (props) => {
  const { isLoading, readTargets, targetReadTargets } = props;

  return (
    <div className="grid gap-2 md:grid-cols-3 mt-2">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={`dashboard-read-target-placeholder-${i}`} className="h-48 w-full" />
          ))
        : null}

      {readTargets && targetReadTargets
        ? dashboardReadTargets.map((type) => {
            return (
              <DashboardReadTargetsCard
                key={`dashboard-read-target-${type}`}
                type={type}
                target={targetReadTargets[type]}
                value={readTargets[type]}
              />
            );
          })
        : null}
    </div>
  );
};

export default DashboardReadTargetsEntries;

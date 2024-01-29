'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useReadTargets } from '@modules/dashboard/hooks/read-targets/use-read-targets';
import DashboardReadTargetsHeader from './header/dashboard-read-targets-header';
import DashboardReadTargetsFeed from './feed/dashboard-read-targets-feed';

const DashboardReadTargets: React.FC = () => {
  const { data, isLoading, isFetching } = useReadTargets();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader data={data} isFetching={isFetching} isLoading={isLoading} />

      <p>
        Set personalized daily, weekly, and monthly reading goals to cultivate a consistent reading habit. Monitor your
        progress and celebrate achievements as you reach milestones.
      </p>

      {isFetching || isLoading ? (
        <div className="grid gap-2 md:grid-cols-3 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={`dashboard-read-target-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!(isFetching || isLoading) && data !== undefined ? <DashboardReadTargetsFeed data={data} /> : null}
    </div>
  );
};

export default DashboardReadTargets;

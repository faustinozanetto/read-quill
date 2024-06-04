'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useReadTargets } from '@modules/dashboard/hooks/read-targets/use-read-targets';
import DashboardReadTargetsHeader from './header/dashboard-read-targets-header';
import DashboardReadTargetsFeed from './feed/dashboard-read-targets-feed';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';

const DashboardReadTargets: React.FC = () => {
  const { targetsCreated, data, isLoading } = useReadTargets();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader data={data} isLoading={isLoading} targetsCreated={targetsCreated} />

      <p>
        Set personalized daily, weekly, and monthly reading goals to cultivate a consistent reading habit. Monitor your
        progress and celebrate achievements as you reach milestones.
      </p>

      {isLoading ? (
        <div className="grid gap-2 md:grid-cols-3 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={`dashboard-read-target-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && data && data.result ? <DashboardReadTargetsFeed data={data.result} /> : null}

      {!isLoading && !targetsCreated ? (
        <DashboardNoDataMessage>
          <p>It looks like you haven't created your read targets yet!</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardReadTargets;

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
    <div className="rounded-lg border p-4 flex flex-col gap-2 h-fit">
      <DashboardReadTargetsHeader
        readTargets={data?.data?.readTargets}
        isLoading={isLoading}
        targetsCreated={targetsCreated}
      />

      <p>
        Set personalized daily, weekly, and monthly reading goals to cultivate a consistent reading habit. Monitor your
        progress and celebrate achievements as you reach milestones.
      </p>

      {isLoading ? (
        <div className="flex gap-2 overflow-x-auto justify-evenly items-stretch">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full min-w-56" key={`dashboard-read-target-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && data?.data?.readTargets ? <DashboardReadTargetsFeed readTargets={data.data.readTargets} /> : null}

      {!isLoading && !targetsCreated ? (
        <DashboardNoDataMessage>
          <p>It looks like you haven't created your read targets yet!</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardReadTargets;

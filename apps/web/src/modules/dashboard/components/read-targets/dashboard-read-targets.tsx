'use client';

import React from 'react';
import { useReadTargetsCreated } from '@modules/dashboard/hooks/use-read-targets-created';
import { useReadTargets } from '@modules/dashboard/hooks/use-read-targets';
import DashboardReadTargetsHeader from './header/dashboard-read-targets-header';
import DashboardReadTargetsFeed from './feed/dashboard-read-targets-feed';

const DashboardReadTargets: React.FC = () => {
  const { isFetching } = useReadTargetsCreated();
  const { readTargets, targetReadTargets } = useReadTargets();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader isFetching={isFetching} targetReadTargets={targetReadTargets} />

      <p>
        Set personalized daily, weekly, and monthly reading goals to cultivate a consistent reading habit. Monitor your
        progress and celebrate achievements as you reach milestones.
      </p>

      <DashboardReadTargetsFeed
        isFetching={isFetching}
        readTargets={readTargets}
        targetReadTargets={targetReadTargets}
      />
    </div>
  );
};

export default DashboardReadTargets;

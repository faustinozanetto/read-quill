'use client';

import React from 'react';
import { useReadTargetsCreated } from '@modules/dashboard/hooks/use-read-targets-created';
import { useReadTargets } from '@modules/dashboard/hooks/use-read-targets';
import DashboardReadTargetsHeader from './header/dashboard-read-targets-header';
import DashboardReadTargetsEntries from './entries/dashboard-read-targets-entries';

const DashboardReadTargets: React.FC = () => {
  const { isLoading } = useReadTargetsCreated();
  const { readTargets, targetReadTargets } = useReadTargets();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader isLoading={isLoading} targetReadTargets={targetReadTargets} />

      <p>Visualize your daily, weekly, and monthly reading goals to shape your literary adventure.</p>

      <DashboardReadTargetsEntries
        isLoading={isLoading}
        readTargets={readTargets}
        targetReadTargets={targetReadTargets}
      />
    </div>
  );
};

export default DashboardReadTargets;

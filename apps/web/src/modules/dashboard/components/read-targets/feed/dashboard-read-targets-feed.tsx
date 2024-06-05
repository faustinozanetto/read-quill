import React from 'react';
import { DASHBOARD_READ_TARGETS, DashboardReadTargets } from '@modules/dashboard/types/dashboard.types';

import DashboardReadTargetsCard from './dashboard-read-targets-card';

interface DashboardReadTargetsFeedProps {
  readTargets: DashboardReadTargets;
}

const DashboardReadTargetsFeed: React.FC<DashboardReadTargetsFeedProps> = (props) => {
  const { readTargets } = props;
  const { targetReadTargets, readTargets: currentReadTargets } = readTargets;

  return (
    <div className="flex gap-2 overflow-x-auto justify-evenly items-stretch">
      {DASHBOARD_READ_TARGETS.map((type) => {
        return (
          <DashboardReadTargetsCard
            key={`dashboard-read-target-${type}`}
            target={targetReadTargets[type]}
            type={type}
            value={currentReadTargets[type]}
          />
        );
      })}
    </div>
  );
};

export default DashboardReadTargetsFeed;

import React from 'react';
import { DASHBOARD_READ_TARGETS } from '@modules/dashboard/types/dashboard.types';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadTargetsCard from './dashboard-read-targets-card';

interface DashboardReadTargetsFeedProps {
  data: NonNullable<DashboardReadTargetsGetResponse['result']>;
}

const DashboardReadTargetsFeed: React.FC<DashboardReadTargetsFeedProps> = (props) => {
  const { data } = props;
  const { targetReadTargets, readTargets } = data;

  return (
    <div className="grid gap-2 md:grid-cols-3 mt-2">
      {DASHBOARD_READ_TARGETS.map((type) => {
        return (
          <DashboardReadTargetsCard
            key={`dashboard-read-target-${type}`}
            target={targetReadTargets[type]}
            type={type}
            value={readTargets[type]}
          />
        );
      })}
    </div>
  );
};

export default DashboardReadTargetsFeed;

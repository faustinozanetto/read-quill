import React from 'react';
import { useReadActivityGraph } from '@modules/dashboard/hooks/read-activity/use-read-activity-graph';

const DashboardReadActivityIndicators: React.FC = () => {
  const { ACTIVITY_THRESHOLDS } = useReadActivityGraph();

  return (
    <div className="w-max ml-auto items-center justify-end flex gap-2 text-xs">
      <span>Less</span>
      {ACTIVITY_THRESHOLDS.map((threshold, i) => {
        const thresholdLevel = ACTIVITY_THRESHOLDS.length - i;
        return (
          <div
            className="h-[14px] w-[14px] rounded-sm"
            key={threshold}
            style={{ backgroundColor: `hsl(var(--primary) / ${(1 / thresholdLevel).toFixed(2)})` }}
          />
        );
      })}
      <span>More</span>
    </div>
  );
};

export default DashboardReadActivityIndicators;

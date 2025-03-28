import React from 'react';

import ReadActivityIndicator from './read-activity-indicator';
import { useReadActivityGraph } from '@modules/common/hooks/read-registries/use-read-activity-graph';

const ReadActivityIndicators: React.FC = () => {
  const { ACTIVITY_THRESHOLDS } = useReadActivityGraph();

  return (
    <div className="w-full justify-between flex text-xs">
      <div className="flex gap-2 items-center">
        <span>Today</span>
        <div className="h-[14px] w-[14px] rounded-lg bg-success" />
      </div>
      <div className="flex gap-1 items-center">
        <span>Less</span>
        {ACTIVITY_THRESHOLDS.map((threshold, i) => {
          const thresholdLevel = ACTIVITY_THRESHOLDS.length - i;
          return (
            <ReadActivityIndicator key={`activity-threshold-indicator-${threshold}`} thresholdLevel={thresholdLevel} />
          );
        })}
        <span>More</span>
      </div>
    </div>
  );
};

export default ReadActivityIndicators;

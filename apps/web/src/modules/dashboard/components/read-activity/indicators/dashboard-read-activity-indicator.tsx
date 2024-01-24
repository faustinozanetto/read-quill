import React from 'react';

interface DashboardReadActivityIndicatorProps {
  thresholdLevel: number;
}

const DashboardReadActivityIndicator: React.FC<DashboardReadActivityIndicatorProps> = (props) => {
  const { thresholdLevel } = props;

  return (
    <div
      className="h-[14px] w-[14px] rounded-sm"
      style={{ backgroundColor: `hsl(var(--primary) / ${(1 / thresholdLevel).toFixed(2)})` }}
    />
  );
};

export default DashboardReadActivityIndicator;

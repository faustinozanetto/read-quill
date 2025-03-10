import React from 'react';

interface ReadActivityIndicatorProps {
  thresholdLevel: number;
}

const ReadActivityIndicator: React.FC<ReadActivityIndicatorProps> = (props) => {
  const { thresholdLevel } = props;

  return (
    <div
      className="h-[14px] w-[14px] rounded-lg"
      style={{ backgroundColor: `hsl(var(--primary) / ${(1 / thresholdLevel).toFixed(2)})` }}
    />
  );
};

export default ReadActivityIndicator;

import React from 'react';
import { Progress } from '@read-quill/design-system';

interface DashboardReadStreakProgressProps {
  readStreak: number;
  targetReadStreak: number;
}

const DashboardReadStreakProgress: React.FC<DashboardReadStreakProgressProps> = (props) => {
  const { readStreak, targetReadStreak } = props;

  const calculatePercentage = () => {
    if (targetReadStreak === 0) return 0;
    return Math.min((readStreak / targetReadStreak) * 100, 100);
  };

  return (
    <div className="rounded-lg border bg-background p-2">
      <div className="flex items-center justify-between mb-1.5">
        <h4 className="font-bold">{targetReadStreak} Days</h4>
        <p className="text-sm">
          {readStreak}/{targetReadStreak} days, <span className="font-bold">{targetReadStreak - readStreak}</span> to
          go!
        </p>
      </div>
      <Progress value={calculatePercentage()} />
    </div>
  );
};

export default DashboardReadStreakProgress;

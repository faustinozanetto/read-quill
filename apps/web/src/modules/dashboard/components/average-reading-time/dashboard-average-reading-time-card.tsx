'use client';

import React from 'react';
import { ArrowBigDownLinesIcon, ArrowBigUpLinesIcon, EqualIcon, Skeleton, cn } from '@read-quill/design-system';

import { useAverageReadingTime } from '@modules/dashboard/hooks/use-average-reading-time';
import { useCountUp } from '@modules/common/hooks/use-count-up';

interface DashboardAverageReadingTimeCardProps {
  title: string;
  current: number;
  past: number;
}

const DashboardAverageReadingTimeCard: React.FC<DashboardAverageReadingTimeCardProps> = (props) => {
  const { title, current, past } = props;

  const { count } = useCountUp({ startValue: 0, endValue: current, duration: 3000 });

  const isGreater = current > past;
  const isEqual = current === past;
  const isLess = current < past;

  return (
    <div className="rounded-lg border p-4 shadow text-center min-w-56 w-full">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="flex gap-1.5 items-center justify-center">
        {React.createElement(isGreater ? ArrowBigUpLinesIcon : isEqual ? EqualIcon : ArrowBigDownLinesIcon, {
          className: cn(
            'h-8 w-8 shadow border rounded-lg p-1',
            isGreater && 'stroke-success-foreground bg-success',
            isEqual && 'stroke-info-foreground bg-info',
            isLess && 'stroke-destructive-foreground bg-destructive'
          ),
        })}
        <p>
          <span
            className={cn(
              'text-3xl font-extrabold tabular-nums',
              isGreater && 'text-success-foreground',
              isEqual && 'text-info-foreground',
              isLess && 'text-destructive-foreground'
            )}
          >
            {count}
          </span>{' '}
          mins
        </p>
      </div>
      <span className="text-muted-foreground text-sm">compared to {past} mins</span>
    </div>
  );
};

export default DashboardAverageReadingTimeCard;

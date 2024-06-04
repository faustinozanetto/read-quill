'use client';

import React from 'react';
import {
  ArrowBigDownLinesIcon,
  ArrowBigUpLinesIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  Badge,
  EqualIcon,
  cn,
} from '@read-quill/design-system';

import { useCountUp } from '@modules/common/hooks/use-count-up';

interface DashboardAverageReadingTimeCardProps {
  title: string;
  current: number;
  past: number;
  renderPast: (difference: number, sign: string) => React.ReactNode;
}

const DashboardAverageReadingTimeCard: React.FC<DashboardAverageReadingTimeCardProps> = (props) => {
  const { title, current, past, renderPast } = props;

  const { count } = useCountUp({ startValue: 0, endValue: current, duration: 3000 });

  const difference = current - past;

  const isGreater = current > past;
  const isEqual = current === past;
  const isLess = current < past;

  const calculatePercentageDifference = (currentAverage: number, pastAverage: number) => {
    if (pastAverage === 0) {
      return currentAverage === 0 ? 0 : 100;
    }
    return ((currentAverage - pastAverage) / pastAverage) * 100;
  };

  return (
    <div className="rounded-lg border p-4 shadow text-center min-w-56 w-full flex items-start flex-col gap-1.5">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="flex gap-1.5 items-center justify-between w-full">
        <p
          className={cn(
            'text-3xl font-extrabold tabular-nums',
            isGreater && 'text-success-foreground',
            isEqual && 'text-info-foreground',
            isLess && 'text-destructive-foreground'
          )}
        >
          {count}
          <span className="text-xs font-medium">mins</span>
        </p>
        <Badge className="gap-1.5" variant={isGreater ? 'success' : isEqual ? 'info' : 'destructive'}>
          {isGreater ? <ArrowUpIcon /> : isEqual ? <EqualIcon /> : <ArrowDownIcon />}
          {calculatePercentageDifference(current, past).toFixed(1)}%
        </Badge>
      </div>
      <span className="text-muted-foreground text-sm">
        {renderPast(Math.abs(difference), isGreater ? '+' : isEqual ? '=' : '-')}
      </span>
    </div>
  );
};

export default DashboardAverageReadingTimeCard;

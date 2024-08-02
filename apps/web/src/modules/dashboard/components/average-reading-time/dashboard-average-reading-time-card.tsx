'use client';

import React from 'react';
import {
  ArrowBigDownLinesIcon,
  ArrowBigUpLinesIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  Badge,
  BadgeProps,
  EqualIcon,
  cn,
} from '@read-quill/design-system';

import { useCountUp } from '@modules/common/hooks/use-count-up';
import { TrendingDownIcon, TrendingUpIcon } from '@read-quill/design-system/src';

type AverageReadingTimeStatus = 'less' | 'equal' | 'greater';

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

  const STATUS: AverageReadingTimeStatus = isGreater ? 'greater' : isEqual ? 'equal' : 'less';

  const calculatePercentageDifference = (currentAverage: number, pastAverage: number) => {
    if (pastAverage === 0) {
      return currentAverage === 0 ? 0 : 100;
    }
    return ((currentAverage - pastAverage) / pastAverage) * 100;
  };

  const ICONS: Record<AverageReadingTimeStatus, React.ReactNode> = {
    less: <TrendingDownIcon />,
    equal: <EqualIcon />,
    greater: <TrendingUpIcon />,
  };

  const BADGE_VARIANTS: Record<AverageReadingTimeStatus, BadgeProps['variant']> = {
    less: 'destructive',
    equal: 'info',
    greater: 'success',
  };

  const TEXT_CLASSES: Record<AverageReadingTimeStatus, string> = {
    less: 'text-destructive-foreground',
    equal: 'text-info-foreground',
    greater: 'text-success-foreground',
  };

  return (
    <div className="rounded-lg border p-4 shadow text-center min-w-56 w-full flex items-start flex-col gap-1.5">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="flex gap-1.5 items-center justify-between w-full">
        <p className={cn('text-3xl font-extrabold tabular-nums', TEXT_CLASSES[STATUS])}>
          {count}
          <span className="text-xs font-medium">mins</span>
        </p>
        <Badge className="gap-1.5" variant={BADGE_VARIANTS[STATUS]}>
          {ICONS[STATUS]}
          {calculatePercentageDifference(current, past).toFixed(1)}%
        </Badge>
      </div>
      <span className="text-muted-foreground text-sm">
        {renderPast(Math.abs(difference), STATUS === 'greater' ? '+' : STATUS === 'less' ? '-' : '')}
      </span>
    </div>
  );
};

export default DashboardAverageReadingTimeCard;

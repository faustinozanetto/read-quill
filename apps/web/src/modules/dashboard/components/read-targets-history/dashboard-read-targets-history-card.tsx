import React, { forwardRef } from 'react';
import { cn } from '@read-quill/design-system';
import { Separator } from '@read-quill/design-system';
import { DashboardReadTargetHistoryEntry, DashboardReadTargetsType } from '@modules/dashboard/types/dashboard.types';
import { isSameMonth, isSameWeek, isToday } from 'date-fns';

interface DashboardReadTargetsHistoryCardProps {
  readTargetHistoryEntry: DashboardReadTargetHistoryEntry;
  readTarget?: number;
  interval: DashboardReadTargetsType;
}

const DashboardReadTargetsHistoryCard = forwardRef<HTMLDivElement, DashboardReadTargetsHistoryCardProps>(
  (props, ref) => {
    const { readTargetHistoryEntry, readTarget, interval } = props;
    const radius = 28;
    const strokeWidth = 8;
    const strokeDasharray = 2 * Math.PI * radius;

    const entryDateOptions: Intl.DateTimeFormatOptions =
      interval === 'daily'
        ? { day: '2-digit', month: 'short', year: 'numeric' }
        : interval === 'monthly'
          ? { month: 'short', year: 'numeric' }
          : { month: 'short', year: '2-digit' };

    const isEntryToday = isToday(readTargetHistoryEntry.date);
    const isEntrySameWeek = isSameWeek(readTargetHistoryEntry.date, new Date());
    const isEntrySameMonth = isSameMonth(readTargetHistoryEntry.date, new Date());
    const isEntryMarked =
      (isEntryToday && interval === 'daily') ||
      (isEntrySameWeek && interval === 'weekly') ||
      (isEntrySameMonth && interval === 'monthly');

    return (
      <div
        ref={ref}
        className={cn(
          'p-1 border rounded-lg flex flex-col text-center font-medium items-center hover:border-primary min-w-28',
          isEntryMarked && 'border-primary border'
        )}
      >
        <svg className="m-auto" height="76" width="76" xmlns="http://www.w3.org/2000/svg">
          <circle
            className={cn('fill-transparent stroke-primary -rotate-90 origin-center')}
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              strokeDasharray,
              strokeDashoffset:
                strokeDasharray - (strokeDasharray * Math.min(readTargetHistoryEntry.progress, 100)) / 100,
            }}
          />
          <text
            alignmentBaseline="middle"
            className="font-extrabold text-xs tabular-nums fill-foreground"
            textAnchor="middle"
            x="50%"
            y="50%"
          >
            {readTargetHistoryEntry.progress.toFixed(0)}%
          </text>
        </svg>
        <Separator className="my-1" />
        <span className="text-xs">
          {readTargetHistoryEntry.value}/{readTarget}
        </span>
        <span className="text-xs">
          {new Date(readTargetHistoryEntry.date).toLocaleDateString('en-US', entryDateOptions)}
        </span>
      </div>
    );
  }
);

export default DashboardReadTargetsHistoryCard;

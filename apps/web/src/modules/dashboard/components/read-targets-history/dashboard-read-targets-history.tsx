'use client';

import React, { useMemo } from 'react';
import { useReadTargetsHistory } from '../../hooks/read-targets/use-read-targets-history';
import DashboardReadTargetsHistoryIntervalSelect from './dashboard-read-targets-history-interval-select';
import DashboardReadTargetsHistoryCard from './dashboard-read-targets-history-card';
import { DashboardReadTargetHistoryEntry } from '@modules/dashboard/types/dashboard.types';
import DashboardReadTargetsHistoryCardPlaceholder from './dashboard-read-targets-history-card-placeholder';
import { Button } from '@read-quill/design-system';
import { PlusIcon } from '@read-quill/design-system';
import { LoadingIcon } from '@read-quill/design-system';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';

const DashboardReadTargetsHistory: React.FC = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, interval, setInterval } =
    useReadTargetsHistory();

  const historyEntries = data?.pages.flatMap((v) => v?.data?.historyEntries ?? []) ?? [];
  const dedupedEntries = useMemo(() => {
    const groupedEntries = historyEntries.reduce<
      Record<string, { data: DashboardReadTargetHistoryEntry; occurrences: number }>
    >((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = { data: curr, occurrences: 1 };
      } else {
        acc[curr.date] = {
          data: {
            date: curr.date,
            value: acc[curr.date].data.value + curr.value,
            progress: acc[curr.date].data.progress,
          },
          occurrences: acc[curr.date].occurrences + 1,
        };
      }

      return acc;
    }, {});

    const fixedProgress: DashboardReadTargetHistoryEntry[] = Object.entries(groupedEntries).map((entry) => {
      return {
        date: entry[1].data.date,
        value: entry[1].data.value,
        progress: entry[1].data.progress / entry[1].occurrences,
      };
    });

    return fixedProgress;
  }, [historyEntries]);

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2 h-fit">
      <h2 className="text-xl font-bold">Read Targets History</h2>
      <p>
        Track your reading journey with our Read Targets History. View your progress from previous days, weeks, and
        months to celebrate your achievements and stay motivated. Analyze your reading habits and set new goals to keep
        your literary adventure on track.
      </p>

      {dedupedEntries.length ? (
        <DashboardReadTargetsHistoryIntervalSelect interval={interval} setInterval={setInterval} />
      ) : null}

      {dedupedEntries.length ? (
        <div className="flex gap-2 overflow-x-auto pt-2 pb-4 relative">
          {dedupedEntries.map((readTargetHistoryEntry) => {
            return (
              <DashboardReadTargetsHistoryCard
                key={`dashboard-read-targets-history-${readTargetHistoryEntry.date}`}
                readTargetHistoryEntry={readTargetHistoryEntry}
                interval={interval}
                readTarget={data?.pages[0]?.data?.readTargets[interval]}
              />
            );
          })}
          {(isFetchingNextPage || isLoading) &&
            Array.from({ length: 6 }).map((_, i) => (
              <DashboardReadTargetsHistoryCardPlaceholder key={`dashboard-read-targets-history-placeholder-${i}`} />
            ))}
          {hasNextPage && (
            <Button
              aria-label="Load More"
              className="my-auto"
              onClick={async () => await fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />} Load More
            </Button>
          )}
        </div>
      ) : null}

      {!isLoading && dedupedEntries.length === 0 ? (
        <DashboardNoDataMessage>
          <p>Log your reading sessions to discover your read targets history.</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardReadTargetsHistory;

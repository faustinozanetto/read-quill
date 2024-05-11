'use client';

import { useCommunityThreads } from '@modules/community/hooks/use-community-threads';
import React from 'react';
import CommunityThreadsFeed from './feed/community-threads-feed';
import CommunityThreadsHeader from './community-threads-header';
import CommunityThreadCardPlaceholder from './card/community-thread-card-placeholder';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import { THREADS_INITIAL_FILTERS, THREADS_INITIAL_SORT } from '@modules/community/lib/community-thread-filtering.lib';

const CommunityThreads: React.FC = () => {
  const {
    data,
    isLoading,
    isFetching,
    page,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    setPageIndex,
  } = useCommunityThreads({ pageSize: 12 });

  return (
    <div className="flex w-full flex-col gap-2">
      <CommunityThreadsHeader />

      {isFetching || isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!(isFetching || isLoading) && data.threads.length > 0 ? (
        <FilterProvider
          initialState={{
            initialFilters: THREADS_INITIAL_FILTERS,
            initialSort: THREADS_INITIAL_SORT,
          }}
        >
          <div className="rounded-lg shadow border space-y-4">
            <CommunityThreadsFeed threads={data.threads} />
          </div>
        </FilterProvider>
      ) : null}

      {!(isFetching || isLoading) && data.threads.length === 0 ? (
        <p>
          No threads found! Be the first one by clicking the{' '}
          <span className="text-primary font-bold underline">Start a Thread</span> button to get started.
        </p>
      ) : null}
    </div>
  );
};

export default CommunityThreads;

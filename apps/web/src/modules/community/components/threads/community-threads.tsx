'use client';

import React from 'react';
import { useCommunityThreads } from '@modules/community/hooks/use-community-threads';
import CommunityThreadsFeed from './feed/community-threads-feed';
import CommunityThreadsHeader from './community-threads-header';
import CommunityThreadCardPlaceholder from './card/community-thread-card-placeholder';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import { THREADS_INITIAL_FILTERS, THREADS_INITIAL_SORT } from '@modules/community/lib/community-thread-filtering.lib';
import { ThreadsCommunityGetResponse } from '@modules/api/types/community-api.types';
import { Button, PlusIcon } from '@read-quill/design-system';

const CommunityThreads: React.FC = () => {
  const { data, isLoading, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } = useCommunityThreads({
    pageSize: 10,
  });

  const threads = data
    ? data.pages.reduce<ThreadsCommunityGetResponse['threads']>((acc, curr) => {
        return [...acc, ...curr.threads];
      }, [])
    : [];

  const handleLoadMore = async () => {
    await fetchNextPage();
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <CommunityThreadsHeader />

      <FilterProvider
        initialState={{
          initialFilters: THREADS_INITIAL_FILTERS,
          initialSort: THREADS_INITIAL_SORT,
        }}
      >
        <div className="rounded-lg shadow border space-y-4">
          <CommunityThreadsFeed threads={threads}>
            {isFetchingNextPage || isLoading || isFetching ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
                ))}
              </div>
            ) : null}
            {hasNextPage && (
              <Button className="w-fit min-w-60 mx-auto" onClick={handleLoadMore} disabled={isFetchingNextPage}>
                <PlusIcon className="mr-2" /> Load More
              </Button>
            )}
          </CommunityThreadsFeed>
        </div>
      </FilterProvider>

      {!(isFetching || isLoading) && threads.length === 0 ? (
        <p>
          No threads found! Be the first one by clicking the{' '}
          <span className="text-primary font-bold underline">Start a Thread</span> button to get started.
        </p>
      ) : null}
    </div>
  );
};

export default CommunityThreads;

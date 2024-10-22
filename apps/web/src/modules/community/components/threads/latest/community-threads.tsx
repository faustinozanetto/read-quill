'use client';

import React from 'react';
import { useCommunityThreads } from '@modules/community/hooks/use-community-threads';
import CommunityThreadsFeed from '../feed/community-threads-feed';
import CommunityThreadsHeader from './community-threads-header';
import CommunityThreadCardPlaceholder from '../card/community-thread-card-placeholder';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import { THREADS_INITIAL_FILTERS, THREADS_INITIAL_SORT } from '@modules/community/lib/community-thread-filtering.lib';
import { Button, LoadingIcon, PlusIcon } from '@read-quill/design-system';

const CommunityThreads: React.FC = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useCommunityThreads({
    pageSize: 4,
  });

  const threads = data?.pages.flatMap((v) => v?.data?.threads ?? []) ?? [];

  return (
    <div className="flex w-full flex-col gap-4 min-h-full">
      <CommunityThreadsHeader />
      <FilterProvider
        initialState={{
          initialFilters: THREADS_INITIAL_FILTERS,
          initialSort: THREADS_INITIAL_SORT,
        }}
      >
        <div className="rounded-lg border space-y-4">
          <CommunityThreadsFeed threads={threads}>
            {isFetchingNextPage || isLoading ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
                ))}
              </div>
            ) : null}
            {hasNextPage && (
              <Button
                className="w-fit min-w-60 mx-auto"
                onClick={async () => await fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />} Load More
              </Button>
            )}

            {!isLoading && !threads.length ? (
              <p className="m-auto text-center">
                No threads found! Be the first one by clicking the{' '}
                <span className="text-primary font-bold underline">Start a Thread</span> button to get started.
              </p>
            ) : null}
          </CommunityThreadsFeed>
        </div>
      </FilterProvider>
    </div>
  );
};

export default CommunityThreads;

'use client';

import { useCommunityThreads } from '@modules/community/hooks/use-community-threads';
import React from 'react';
import CommunityThreadsFeed from './feed/community-threads-feed';
import CommunityThreadsHeader from './community-threads-header';
import CommunityThreadCardPlaceholder from './card/community-thread-card-placeholder';

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
    <div className="flex w-full flex-col p-4 gap-2 rounded-lg shadow border">
      <CommunityThreadsHeader />

      <CommunityThreadsFeed threads={data.threads} />
      {isFetching || isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {/* {!(isFetching || isLoading) && data.threads.length > 0 ? (
        <FilterProvider
          initialState={{
            initialFilters: BOOKS_INITIAL_FILTERS,
            initialSort: BOOKS_INITIAL_SORT,
          }}
        >
          <div className="rounded-lg shadow border space-y-4">
            <UserBooksFeed
              books={data.books}
              getCanNextPage={getCanNextPage}
              getCanPreviousPage={getCanPreviousPage}
              nextPage={nextPage}
              page={page}
              pageCount={data.pageCount}
              previousPage={previousPage}
              setPageIndex={setPageIndex}
            />
          </div>
        </FilterProvider>
      ) : null} */}

      {!(isFetching || isLoading) && data.threads.length === 0 ? (
        <p>
          Let&apos;s build your book collection! Click the{' '}
          <span className="text-primary font-bold underline">Create Book</span> button to get started.
        </p>
      ) : null}
    </div>
  );
};

export default CommunityThreads;

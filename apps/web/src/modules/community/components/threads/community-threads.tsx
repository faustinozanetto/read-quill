'use client';

import { useCommunityThreads } from '@modules/community/hooks/use-community-threads';
import React from 'react';
import CommunityThreadsFeed from './feed/community-threads-feed';
import CommunityThreadsHeader from './community-threads-header';

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
  } = useCommunityThreads({ pageSize: 6 });

  return (
    <div className="flex w-full flex-col gap-2 p-4 rounded-lg shadow border">
      <CommunityThreadsHeader />

      <CommunityThreadsFeed threads={data.threads} />
      {/* {isFetching || isLoading ? (
        <div
          className="grid gap-4 p-4 border rounded-lg shadow"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <BookCardPlaceholder key={`user-book-placeholder-${i}`} />
          ))}
        </div>
      ) : null} */}

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

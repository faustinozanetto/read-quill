'use client';

import React from 'react';
import Link from 'next/link';
import { Skeleton } from '@read-quill/design-system';
import { useBooksProgress } from '@modules/dashboard/hooks/use-books-progress';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';
import DashboardBooksProgressHeader from './header/dashboard-books-progress-header';
import DashboardBooksProgressFeed from './feed/dashboard-books-progress-feed';
import DashboardBooksProgressFeedPagination from './feed/dashboard-books-progress-feed-pagination';

const DashboardBooksProgress: React.FC = () => {
  const {
    data,
    isLoading,
    isFetching,
    page,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    setPageIndex,
  } = useBooksProgress();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardBooksProgressHeader />
      <p>
        Track your literary journey with the Books Progress section. Visualize the percentage of each book you&apos;ve
        conquered on your reading adventure.
      </p>
      {isFetching || isLoading ? (
        <div className="space-y-2">
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton className="h-48 w-full" key={`dashboard-books-progress-placeholder-${i}`} />
            ))}
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      ) : null}
      {!(isFetching || isLoading) && data.booksProgress.length > 0 ? (
        <div className="flex flex-col gap-2">
          <DashboardBooksProgressFeed booksProgress={data.booksProgress} />
          <DashboardBooksProgressFeedPagination
            getCanNextPage={getCanNextPage}
            getCanPreviousPage={getCanPreviousPage}
            nextPage={nextPage}
            page={page}
            pageCount={data.pageCount}
            previousPage={previousPage}
            setPageIndex={setPageIndex}
          />
        </div>
      ) : null}
      {!(isFetching || isLoading) && data.booksProgress.length === 0 ? (
        <DashboardNoDataMessage>
          <p>
            Start by adding your first book to track progress{' '}
            <Link className="font-bold text-primary underline" href="/books?add-book-modal=true">
              Here
            </Link>
          </p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardBooksProgress;

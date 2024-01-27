import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useBooksProgress } from '@modules/dashboard/hooks/use-books-progress';
import DashboardBooksProgressHeader from './header/dashboard-books-progress-header';
import DashboardBooksProgressFeed from './feed/dashboard-books-progress-feed';
import DashboardBooksProgressFeedPagination from './feed/dashboard-books-progress-feed-pagination';

const DashboardBooksProgress: React.FC = () => {
  const { data, isLoading, isFetching, page, getCanPreviousPage, getCanNextPage, previousPage, nextPage } =
    useBooksProgress();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardBooksProgressHeader />
      <p>
        Track your literary journey with the Books Progress section. Visualize the percentage of each book you&apos;ve
        conquered on your reading adventure.
      </p>
      {isFetching || isLoading ? (
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={`dashboard-books-progress-placeholder-${i}`} />
          ))}
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
          />
        </div>
      ) : null}
      {!(isFetching || isLoading) && data.booksProgress.length === 0 ? (
        <p>Not enough data to display books progress!</p>
      ) : null}
    </div>
  );
};

export default DashboardBooksProgress;

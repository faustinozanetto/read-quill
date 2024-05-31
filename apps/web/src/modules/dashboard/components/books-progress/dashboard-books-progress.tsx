'use client';

import React from 'react';
import Link from 'next/link';
import { Skeleton } from '@read-quill/design-system';
import { useBooksProgress } from '@modules/dashboard/hooks/use-books-progress';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import {
  BOOKS_PROGRESS_INITIAL_FILTERS,
  BOOKS_PROGRESS_INITIAL_SORT,
} from '@modules/dashboard/lib/dashboard-filtering.lib';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';
import DashboardBooksProgressHeader from './header/dashboard-books-progress-header';
import DashboardBooksProgressFeed from './feed/dashboard-books-progress-feed';

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
  } = useBooksProgress({ pageSize: 4 });

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardBooksProgressHeader />
      <p>
        Track your literary journey with the Books Progress section. Visualize the percentage of each book you&apos;ve
        conquered on your reading adventure.
      </p>

      <FilterProvider
        initialState={{
          initialFilters: BOOKS_PROGRESS_INITIAL_FILTERS,
          initialSort: BOOKS_PROGRESS_INITIAL_SORT,
        }}
      >
        <div className="rounded-lg shadow border space-y-4">
          <DashboardBooksProgressFeed
            booksProgress={data.booksProgress}
            getCanNextPage={getCanNextPage}
            getCanPreviousPage={getCanPreviousPage}
            nextPage={nextPage}
            page={page}
            pageCount={data.pageCount}
            previousPage={previousPage}
            setPageIndex={setPageIndex}
            renderPlaceholder={() => {
              if (isFetching || isLoading)
                return Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton className="h-48 w-full" key={`dashboard-books-progress-placeholder-${i}`} />
                ));
            }}
            renderNoBooks={() => {
              if (!(isFetching || isLoading) && data.booksProgress.length === 0)
                return (
                  <DashboardNoDataMessage>
                    <p>
                      Start by adding your first book to track progress{' '}
                      <Link className="font-bold text-primary underline" href="/books?add-book-modal=true">
                        Here
                      </Link>
                    </p>
                  </DashboardNoDataMessage>
                );
            }}
          />
        </div>
      </FilterProvider>
    </div>
  );
};

export default DashboardBooksProgress;

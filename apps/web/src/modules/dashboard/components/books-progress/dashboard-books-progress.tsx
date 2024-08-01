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
  const { data, isLoading, page, getCanPreviousPage, getCanNextPage, previousPage, nextPage, setPageIndex } =
    useBooksProgress({ pageSize: 6 });

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
            booksProgress={data?.data?.booksProgress ?? []}
            getCanNextPage={getCanNextPage}
            getCanPreviousPage={getCanPreviousPage}
            nextPage={nextPage}
            page={page}
            pageCount={data?.data?.pageCount ?? 0}
            previousPage={previousPage}
            setPageIndex={setPageIndex}
          >
            {isLoading && (
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4 mt-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton className="h-48 w-full" key={`dashboard-books-progress-placeholder-${i}`} />
                ))}
              </div>
            )}

            {!isLoading && data && !data.data?.booksProgress.length ? (
              <DashboardNoDataMessage className="m-auto">
                <p>
                  No books found, start by adding your first book to track progress{' '}
                  <Link className="font-bold text-primary underline" href="/library?create-book=true">
                    Here
                  </Link>
                </p>
              </DashboardNoDataMessage>
            ) : null}
          </DashboardBooksProgressFeed>
        </div>
      </FilterProvider>
    </div>
  );
};

export default DashboardBooksProgress;

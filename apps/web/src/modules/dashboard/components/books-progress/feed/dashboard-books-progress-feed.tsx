'use client';

import React from 'react';
import { useBooksProgress } from '@modules/dashboard/hooks/use-books-progress';
import { Button, Skeleton } from '@read-quill/design-system';
import DashboardBooksProgressCard from './dashboard-books-progress-card';

const DashboardBooksProgressFeed: React.FC = () => {
  const { data, isFetching, page, getCanPreviousPage, getCanNextPage, previousPage, nextPage } = useBooksProgress();

  const booksProgress = data.booksProgress;

  return (
    <div>
      {isFetching ? (
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={`dashboard-books-progress-placeholder-${i}`} />
          ))}
        </div>
      ) : (
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mt-2">
          {booksProgress.map((bookProgress) => {
            return (
              <DashboardBooksProgressCard
                cover={bookProgress.cover}
                id={bookProgress.id}
                key={`dashboard-books-progress-${bookProgress.id}`}
                name={bookProgress.name}
                progress={bookProgress.progress}
              />
            );
          })}
        </div>
      )}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {page + 1} of {data.pageCount}
        </div>
        <div className="space-x-2">
          <Button
            aria-label="Previous Page"
            disabled={!getCanPreviousPage()}
            onClick={() => {
              previousPage();
            }}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            aria-label="Next Page"
            disabled={!getCanNextPage()}
            onClick={() => {
              nextPage();
            }}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
      {!isFetching && data.booksProgress.length === 0 ? <p>No books found to display read progress!</p> : null}
    </div>
  );
};

export default DashboardBooksProgressFeed;

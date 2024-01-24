'use client';

import React from 'react';
import { useBooksProgress } from '@modules/dashboard/hooks/use-books-progress';
import { Skeleton } from '@read-quill/design-system';
import DashboardBooksProgressHeader from './header/dashboard-books-progress-header';
import DashboardBooksProgressEntries from './feed/dashboard-books-progress-feed';

const DashboardBooksProgress: React.FC = () => {
  const { booksProgress, isLoading } = useBooksProgress();

  const booksProgressArray = Object.entries(booksProgress);

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardBooksProgressHeader />
      <p>
        Track your literary journey with the Books Progress section. Visualize the percentage of each book you&apos;ve
        conquered on your reading adventure.
      </p>

      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={`dashboard-books-progress-placeholder-${i}`} />
          ))
        : null}

      <DashboardBooksProgressEntries booksProgress={booksProgressArray} isLoading={isLoading} />

      {!isLoading && booksProgressArray.length === 0 ? <p>No books found to display read progress!</p> : null}
    </div>
  );
};

export default DashboardBooksProgress;

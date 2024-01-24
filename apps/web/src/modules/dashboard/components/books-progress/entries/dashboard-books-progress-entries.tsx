import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import type { DashboardBooksProgress } from '@modules/dashboard/types/dashboard.types';
import DashboardBooksProgressCard from './dashboard-books-progress-card';

interface DashboardBooksProgressEntriesProps {
  isLoading: boolean;
  booksProgress: DashboardBooksProgress;
}

const DashboardBooksProgressEntries: React.FC<DashboardBooksProgressEntriesProps> = (props) => {
  const { isLoading, booksProgress } = props;

  const booksProgressArray = Object.entries(booksProgress);

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mt-2">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 w-full" key={`dashboard-books-progress-placeholder-${i}`} />
          ))
        : null}

      {!isLoading && booksProgressArray && booksProgressArray.length > 0
        ? booksProgressArray.map(([bookId, data]) => {
            return (
              <DashboardBooksProgressCard
                cover={data.cover}
                id={bookId}
                key={`dashboard-books-progress-${bookId}`}
                name={data.name}
                progress={data.progress}
              />
            );
          })
        : null}

      {!isLoading && booksProgressArray && booksProgressArray.length === 0 ? (
        <p>No books found to display read progress!</p>
      ) : null}
    </div>
  );
};

export default DashboardBooksProgressEntries;

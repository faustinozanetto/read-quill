'use client';

import React from 'react';
import { Skeleton, cn } from '@read-quill/design-system';

import DashboardNoDataMessage from '../common/dashboard-no-data-message';
import { useLastRead } from '@modules/dashboard/hooks/use-last-read';
import DashboardLastReadCard from './dashboard-last-read-card';

interface DashboardLastReadProps {
  className?: string;
}

const DashboardLastRead: React.FC<DashboardLastReadProps> = (props) => {
  const { className } = props;

  const { data, isLoading } = useLastRead();

  return (
    <div className={cn('rounded-lg border p-4 shadow flex flex-col gap-2 h-fit', className)}>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
        <h2 className="text-xl font-bold">Last Read Books</h2>
      </div>
      <p>
        Explore the books you've recently delved into. This section helps you keep track of your reading journey,
        allowing you to easily revisit your favorite stories and see your progress.
      </p>
      {isLoading && (
        <div className="flex gap-4 overflow-x-auto mt-4 pb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={`dashboard-last-read-placeholder-${index}`} className="h-44 w-full" />
          ))}
        </div>
      )}

      {!isLoading && data?.data?.books.length ? (
        <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto mt-4 pb-4">
          {data.data.books.map((lastRead) => (
            <DashboardLastReadCard key={`dashboard-last-read-${lastRead.book.id}`} lastRead={lastRead} />
          ))}
        </div>
      ) : null}

      {!isLoading && data && !data.data?.books.length ? (
        <DashboardNoDataMessage>
          <p>No books found. Start reading your books for better insights.</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardLastRead;

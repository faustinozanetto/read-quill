'use client';

import React from 'react';
import { Skeleton, cn } from '@read-quill/design-system';
import { useBooksRatings } from '@modules/dashboard/hooks/use-books-ratings';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';
import DashboardBooksRatingsHeader from './dashboard-books-ratings-header';
import DashboardBooksRatingsChart from './dashboard-books-ratings-chart';

interface DashboardBooksRatingsProps {
  className?: string;
}

const DashboardBooksRatings: React.FC<DashboardBooksRatingsProps> = (props) => {
  const { className } = props;

  const { data, isLoading } = useBooksRatings();

  return (
    <div className={cn('rounded-lg border p-4 flex flex-col gap-2 h-fit', className)}>
      <DashboardBooksRatingsHeader />
      <p>
        Get a quick overview of your book ratings with our visual representation. Discover the distribution of ratings
        in your collection, from high-rated favourites to hidden gems. Uncover insights into your reading preferences
        effortlessly.
      </p>
      {isLoading && <Skeleton className="h-40 w-full" />}

      {!isLoading && data?.data?.booksRatings.length ? (
        <DashboardBooksRatingsChart booksRatings={data.data.booksRatings} />
      ) : null}

      {!isLoading && data && !data.data?.booksRatings.length ? (
        <DashboardNoDataMessage>
          <p>No book ratings found. Rate your finished books for better insights.</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardBooksRatings;

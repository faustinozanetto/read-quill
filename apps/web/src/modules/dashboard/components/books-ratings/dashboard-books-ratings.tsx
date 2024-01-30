'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useBooksRatings } from '@modules/dashboard/hooks/use-books-ratings';
import DashboardBooksRatingsHeader from './dashboard-books-ratings-header';
import DashboardBooksRatingsChart from './dashboard-books-ratings-chart';

const DashboardBooksRatings: React.FC = () => {
  const { data, isLoading, isFetching } = useBooksRatings();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardBooksRatingsHeader />
      <p>
        Get a quick overview of your book ratings with our visual representation. Discover the distribution of ratings
        in your collection, from high-rated favorites to hidden gems. Uncover insights into your reading preferences
        effortlessly.
      </p>
      {isFetching || isLoading ? <Skeleton className="h-40 w-full" /> : null}

      {!(isFetching || isLoading) ? <DashboardBooksRatingsChart booksRatings={data.booksRatings} /> : null}
    </div>
  );
};

export default DashboardBooksRatings;

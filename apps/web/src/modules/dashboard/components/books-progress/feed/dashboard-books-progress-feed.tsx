import React from 'react';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardBooksProgressCard from './dashboard-books-progress-card';

interface DashboardBooksProgressFeedProps {
  booksProgress: DashboardBooksProgressGetResponse['booksProgress'];
}

const DashboardBooksProgressFeed: React.FC<DashboardBooksProgressFeedProps> = (props) => {
  const { booksProgress } = props;

  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4 mt-2">
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
  );
};

export default DashboardBooksProgressFeed;

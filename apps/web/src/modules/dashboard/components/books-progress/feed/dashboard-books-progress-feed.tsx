import React from 'react';
import DashboardBooksProgressCard from './dashboard-books-progress-card';

interface DashboardBooksProgressFeedProps {
  isLoading: boolean;
  booksProgress: [
    string,
    {
      name: string;
      cover: string;
      progress: number;
    },
  ][];
}

const DashboardBooksProgressFeed: React.FC<DashboardBooksProgressFeedProps> = (props) => {
  const { isLoading, booksProgress } = props;

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mt-2">
      {!isLoading && booksProgress.length > 0
        ? booksProgress.map(([bookId, data]) => {
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
    </div>
  );
};

export default DashboardBooksProgressFeed;

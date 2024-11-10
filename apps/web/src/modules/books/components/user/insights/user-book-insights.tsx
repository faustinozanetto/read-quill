'use client';

import React from 'react';
import { useBookInsights } from '@modules/books/hooks/use-book-insights';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import { Skeleton } from '@read-quill/design-system';
import UserBookInsightsCard from './user-book-insights-card';
import { useBookContext } from '@modules/books/hooks/use-book-context';

const UserBookInsights: React.FC = () => {
  const { book } = useBookContext();
  const { isBookOwner } = useIsBookOwner();
  const { data, isLoading } = useBookInsights({ bookId: book?.id });

  return (
    <div className="flex flex-col rounded-lg p-4 gap-2 border">
      <h2 className="text-2xl font-bold">📈 Insights</h2>

      {isLoading && (
        <div className="grid gap-2 md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {!isLoading && data?.data && (
        <>
          <p>
            {isBookOwner
              ? 'Get detailed insights into your reading journey. Keep track of your progress, last read date, and more to stay motivated!'
              : 'Check out this user reading insights. See their progress, last read date, and more. Cheer them on and share the joy of reading!'}
          </p>

          <div className="grid gap-2 md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <UserBookInsightsCard title="Progress" content={<span>{data.data.progress}%</span>} />
            <UserBookInsightsCard title="Pages Read" content={<span>{data.data.pagesRead}</span>} />
            <UserBookInsightsCard title="Read Sessions" content={<span>{data.data.sessionsCount}</span>} />
            <UserBookInsightsCard
              title="Last Read"
              content={
                <span>
                  {data.data.lastRead
                    ? new Date(data.data.lastRead).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      })
                    : 'None'}
                </span>
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserBookInsights;

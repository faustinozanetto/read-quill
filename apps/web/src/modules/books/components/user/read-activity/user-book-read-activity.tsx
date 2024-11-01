'use client';

import React from 'react';
import { Skeleton, cn } from '@read-quill/design-system';

import ReadActivityGraph from '@modules/common/components/read-registries/activity-graph/read-activity-graph';
import ReadActivityIndicators from '@modules/common/components/read-registries/activity-graph/indicators/read-activity-indicators';

import DashboardNoDataMessage from '@modules/dashboard/components/common/dashboard-no-data-message';
import { useReadActivity } from '@modules/books/hooks/use-read-activity';
import { useBookStore } from '@modules/books/state/book.slice';

const UserBookReadActivity: React.FC = () => {
  const { book } = useBookStore();
  const { data, isLoading } = useReadActivity({ bookId: book?.id });

  const readActivityArray = data?.data ? Object.entries(data.data?.readActivity) : [];

  return (
    <div className="rounded-lg border p-4 flex flex-col gap-2 overflow-hidden h-fit">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
        <h2 className="text-xl font-bold">📖 Read Activity</h2>
      </div>
      <p>
        Explore your reading journey visually with the Read Activity Graph. Each square represents a day, allowing you
        to track your daily reading habits. Color-coded levels provide insights into your reading intensity, making it
        easy to see patterns over time.
      </p>

      {isLoading ? <Skeleton className="h-48 w-full" /> : null}

      {!isLoading && data?.data?.readActivity && readActivityArray.length ? (
        <div className="flex flex-col gap-2">
          <ReadActivityGraph readActivity={data.data?.readActivity} />
          <ReadActivityIndicators />
        </div>
      ) : null}

      {!isLoading && !readActivityArray.length ? (
        <DashboardNoDataMessage>
          <p>Your reading journey begins here. Log your activity to see the graph.</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default UserBookReadActivity;

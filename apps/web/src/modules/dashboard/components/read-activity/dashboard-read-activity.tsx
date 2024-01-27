'use client';

import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { useReadActivity } from '@modules/dashboard/hooks/read-activity/use-read-activity';
import DashboardReadActivityHeader from './header/dashboard-read-activity-header';
import DashboardReadActivityGraph from './graph/dashboard-read-activity-graph';
import DashboardReadActivityIndicators from './indicators/dashboard-read-activity-indicators';

const DashboardReadActivity: React.FC = () => {
  const { data, isFetching, isLoading } = useReadActivity();

  const readActivityArray = Object.entries(data.readActivity);

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2 overflow-hidden">
      <DashboardReadActivityHeader />
      <p>
        Explore your reading journey visually with the Read Activity Graph. Each square represents a day, allowing you
        to track your daily reading habits. Color-coded levels provide insights into your reading intensity, making it
        easy to see patterns over time.
      </p>

      {isFetching || isLoading ? <Skeleton className="h-48 w-full" /> : null}

      {!(isFetching || isLoading) && readActivityArray.length > 0 ? (
        <div className="flex flex-col gap-2">
          <DashboardReadActivityGraph readActivity={data.readActivity} />
          <DashboardReadActivityIndicators />
        </div>
      ) : null}

      {!(isFetching || isLoading) && readActivityArray.length === 0 ? (
        <p>Not enough data to display read activity!</p>
      ) : null}
    </div>
  );
};

export default DashboardReadActivity;

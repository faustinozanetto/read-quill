'use client';

import React from 'react';
import { Skeleton, cn } from '@read-quill/design-system';

import DashboardNoDataMessage from '../common/dashboard-no-data-message';
import DashboardReadActivityHeader from './header/dashboard-read-activity-header';
import ReadActivityGraph from '@modules/common/components/read-registries/activity-graph/read-activity-graph';
import ReadActivityIndicators from '@modules/common/components/read-registries/activity-graph/indicators/read-activity-indicators';
import { useReadActivity } from '@modules/dashboard/hooks/read-activity/use-read-activity';

interface DashboardReadActivityProps {
  className?: string;
}

const DashboardReadActivity: React.FC<DashboardReadActivityProps> = (props) => {
  const { className } = props;
  const { data, isLoading } = useReadActivity();

  const readActivityArray = data?.data ? Object.entries(data.data?.readActivity) : [];

  return (
    <div className={cn('rounded-lg border p-4 flex flex-col gap-2 overflow-hidden h-fit', className)}>
      <DashboardReadActivityHeader />
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

export default DashboardReadActivity;

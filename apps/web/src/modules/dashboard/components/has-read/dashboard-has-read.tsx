'use client';

import React from 'react';
import { CheckIcon, ExclamationIcon, Skeleton } from '@read-quill/design-system';

import { useHasRead } from '@modules/dashboard/hooks/use-has-read';

const DashboardHasRead: React.FC = () => {
  const { data, isLoading } = useHasRead();

  return (
    <div className="rounded-lg border p-4 flex flex-col gap-2 h-fit">
      {isLoading && <Skeleton className="h-24 w-full" />}

      {!isLoading && data?.data && data.data.hasRead && (
        <div>
          <div className="bg-primary p-2 rounded-lg border float-left mr-4">
            <CheckIcon className="stroke-primary-foreground" />
          </div>
          <p>
            Great job! You've already spent some time reading today. Keep up the excellent habit and continue your
            journey through your current book. Remember, consistency is key to reaching your reading goals!
          </p>
        </div>
      )}

      {!isLoading && data?.data && !data.data.hasRead && (
        <div>
          <div className="bg-primary p-2 rounded-lg border float-start mr-4">
            <ExclamationIcon className="stroke-primary-foreground" />
          </div>
          <p>
            It looks like you haven't had a chance to read yet today. Why not take a few moments now to dive into a book
            and enjoy some peaceful reading time? Every page brings you closer to your goals and enriches your
            knowledge.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardHasRead;

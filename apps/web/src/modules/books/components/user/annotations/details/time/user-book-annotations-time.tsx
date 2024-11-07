'use client';

import React from 'react';
import { useBookAnnotationsTime } from '@modules/books/hooks/annotations/use-book-annotations-time';
import { useBookContext } from '@modules/books/hooks/use-book-context';
import DataIntervalSelect from '@modules/common/components/data/data-interval-select';
import NoDataMessage from '@modules/common/components/data/no-data-message';
import UserBookAnnotationsTimeChart from './user-book-annotations-time-chart';
import { Skeleton } from '@read-quill/design-system';

const UserBookAnnotationsTime: React.FC = () => {
  const { book } = useBookContext();
  const { data, isLoading, interval, setInterval } = useBookAnnotationsTime({ bookId: book?.id });

  const annotationGroups = Object.entries(data?.data?.annotations ?? {});

  return (
    <div className="flex flex-col rounded-lg p-4 border gap-2">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-bold">📈 Over Time</h2>
      </div>

      <p>
        Explore the way you created the annotations over time, use the interval to select the time span of your
        annotations.
      </p>

      {annotationGroups.length ? <DataIntervalSelect interval={interval} setInterval={setInterval} /> : null}

      {isLoading ? <Skeleton className="h-48 w-full" /> : null}

      {!isLoading && annotationGroups.length > 0 && (
        <UserBookAnnotationsTimeChart annotationGroups={annotationGroups} interval={interval} />
      )}

      {!isLoading && annotationGroups.length === 0 ? (
        <NoDataMessage>
          <p>No annotations found, once you create some, they will show up here.</p>
        </NoDataMessage>
      ) : null}
    </div>
  );
};

export default UserBookAnnotationsTime;

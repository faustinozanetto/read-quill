'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@read-quill/design-system';
import { Button } from '@read-quill/design-system';
import { PencilIcon } from '@read-quill/design-system';

const CommunityThreadsHeader: React.FC = () => {
  const { status } = useSession();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
      <h1 className="text-2xl font-bold">Latest Threads</h1>
      {status === 'loading' ? (
        <Skeleton className="h-10 w-full md:w-32" />
      ) : (
        <Button>
          <PencilIcon className="mr-2" /> Start a Thread
        </Button>
      )}
    </div>
  );
};

export default CommunityThreadsHeader;
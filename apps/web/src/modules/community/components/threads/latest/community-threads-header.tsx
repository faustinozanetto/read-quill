import React from 'react';
import { Button } from '@read-quill/design-system';
import { PencilIcon } from '@read-quill/design-system';
import Link from 'next/link';

const CommunityThreadsHeader: React.FC = () => {
  return (
    <div className="flex flex-col rounded-lg border p-4 gap-4 md:flex-row md:justify-between">
      <div>
        <h1 className="text-2xl font-bold block">Latest Threads</h1>
        <p>Browse the latest threads posted by our community users.</p>
      </div>
      <Button asChild>
        <Link href="/community/post-thread">
          <PencilIcon className="mr-2" /> Start a Thread
        </Link>
      </Button>
    </div>
  );
};

export default CommunityThreadsHeader;

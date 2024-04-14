import React from 'react';

const CommunityThreadsHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
      <h1 className="text-2xl font-bold">Latest Threads</h1>
    </div>
  );
};

export default CommunityThreadsHeader;

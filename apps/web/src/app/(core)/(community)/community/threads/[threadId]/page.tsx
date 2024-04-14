'use client';

import React from 'react';

interface CommunityThreadPageProps {
  params: {
    threadId: string;
  };
}

const CommunityThreadPage: React.FC<CommunityThreadPageProps> = (props) => {
  const { params } = props;
  const { threadId } = params;

  return <div className="container my-4"></div>;
};

export default CommunityThreadPage;

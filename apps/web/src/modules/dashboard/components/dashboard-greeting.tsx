'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@read-quill/design-system';

const DashboardGreeting: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="rounded-lg border p-4 shadow">
      {status === 'loading' ? (
        <Skeleton className="h-6 w-1/2" />
      ) : (
        <h1 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">
          👋 Welcome Back {session?.user.name}
        </h1>
      )}
      <p className="mt-2">
        Track progress, explore recommendations, and enjoy a personalized literary hub. Happy reading!
      </p>
    </div>
  );
};

export default DashboardGreeting;

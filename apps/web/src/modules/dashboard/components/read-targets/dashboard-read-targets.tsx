'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardReadTargetsEntries from './entries/dashboard-read-targets-entries';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardReadTargetsHeader from './header/dashboard-read-targets-header';
import { ReadTargets } from '@read-quill/database';

const DashboardReadTargets: React.FC = () => {
  const { data, isLoading } = useQuery<{
    targetReadTargets: Omit<ReadTargets, 'id' | 'userId'>;
    readTargets: Omit<ReadTargets, 'id' | 'userId'>;
  }>(['dashboard-read-targets'], {
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-targets', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user read targets!');
      }

      return await response.json();
    },
  });

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader isLoading={isLoading} targetReadTargets={data?.targetReadTargets} />

      <p>Visualize your daily, weekly, and monthly reading goals to shape your literary adventure.</p>

      <DashboardReadTargetsEntries
        isLoading={isLoading}
        readTargets={data?.readTargets}
        targetReadTargets={data?.targetReadTargets}
      />
    </div>
  );
};

export default DashboardReadTargets;

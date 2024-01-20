'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardReadTargetsHeader from './header/dashboard-read-registries-header';
import DashboardReadRegistriesTable from './table/dashboard-read-registries-table';
import { useReadRegistries } from '@modules/dashboard/hooks/use-read-registries';

const DashboardReadRegistries: React.FC = () => {
  const { readRegistries } = useReadRegistries();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader />
      <p>Visualize and reate read registries to track your progress with your books!</p>
      <DashboardReadRegistriesTable readRegistries={readRegistries} />
    </div>
  );
};

export default DashboardReadRegistries;

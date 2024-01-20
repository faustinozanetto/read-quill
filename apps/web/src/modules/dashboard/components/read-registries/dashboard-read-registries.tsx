import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardReadTargetsHeader from './header/dashboard-read-registries-header';

const DashboardReadRegistries: React.FC = () => {
  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader />
      <p>Create read registries to track your progress with your books!</p>
    </div>
  );
};

export default DashboardReadRegistries;

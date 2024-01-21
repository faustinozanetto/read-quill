import React from 'react';
import DashboardReadTargetsHeader from './header/dashboard-read-registries-header';
import DashboardReadRegistriesTable from './table/dashboard-read-registries-table';

const DashboardReadRegistries: React.FC = () => {
  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader />
      <p>Visualize and reate read registries to track your progress with your books!</p>
      <DashboardReadRegistriesTable />
    </div>
  );
};

export default DashboardReadRegistries;

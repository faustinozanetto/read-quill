import React from 'react';
import DashboardReadTargetsHeader from './header/dashboard-read-registries-header';
import DashboardReadRegistriesTable from './table/dashboard-read-registries-table';

const DashboardReadRegistries: React.FC = () => {
  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardReadTargetsHeader />
      <p>
        Create detailed entries for each book you delve into, capturing essential details like progress, book covers,
        and titles. Navigate through a curated table displaying your read registries, offering a comprehensive overview
        of your reading history.{' '}
      </p>
      <DashboardReadRegistriesTable />
    </div>
  );
};

export default DashboardReadRegistries;

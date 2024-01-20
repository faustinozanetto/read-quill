import React from 'react';
import DashboardReadRegistriesCreate from './create/dashboard-read-registries-create';

const DashboardReadRegistriesHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
      <h2 className="text-2xl font-bold">Read Registries</h2>
      <DashboardReadRegistriesCreate />
    </div>
  );
};

export default DashboardReadRegistriesHeader;

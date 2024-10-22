'use client';
import React from 'react';
import DashboardReadRegistriesHeader from './header/dashboard-read-registries-header';
import DashboardReadRegistriesTable from './table/dashboard-read-registries-table';
import { useReadRegistries } from '@modules/dashboard/hooks/use-read-registries';
import { Skeleton } from '@read-quill/design-system';
import DashboardNoDataMessage from '../common/dashboard-no-data-message';

const DashboardReadRegistries: React.FC = () => {
  const { data, isLoading, pagination, setPagination } = useReadRegistries();

  return (
    <div className="rounded-lg border p-4 flex flex-col gap-2">
      <DashboardReadRegistriesHeader />
      <p>
        Create detailed entries for each book you delve into, capturing essential details like progress, book covers,
        and titles. Navigate through a curated table displaying your read registries, offering a comprehensive overview
        of your reading history.
      </p>

      {isLoading ? <Skeleton className="h-48 w-full" /> : null}

      {!isLoading && data?.data?.readRegistries.length ? (
        <DashboardReadRegistriesTable
          readRegistries={data.data.readRegistries}
          pageCount={data.data.pageCount}
          pagination={pagination}
          setPagination={setPagination}
        />
      ) : null}

      {!isLoading && !data?.data?.readRegistries.length ? (
        <DashboardNoDataMessage>
          <p>Start logging your readings to discover trends over time.</p>
        </DashboardNoDataMessage>
      ) : null}
    </div>
  );
};

export default DashboardReadRegistries;

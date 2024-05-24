import React from 'react';
import { Skeleton } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadTargetsCreate from './create/dashboard-read-targets-create';
import DashboardReadTargetsManagement from './management/dashboard-read-targets-management';

interface DashboardReadTargetsHeaderProps {
  isFetching: boolean;
  isLoading: boolean;
  targetsCreated: boolean;
  data?: DashboardReadTargetsGetResponse;
}

const DashboardReadTargetsHeader: React.FC<DashboardReadTargetsHeaderProps> = (props) => {
  const { isFetching, isLoading, targetsCreated, data } = props;

  return (
    <div className="flex gap-2 items-center justify-between">
      <h2 className="text-2xl font-bold">Read Targets</h2>
      {isFetching || isLoading ? <Skeleton className="h-10 w-full md:w-1/4" /> : null}

      {!(isFetching || isLoading) && targetsCreated && data && data.result ? (
        <DashboardReadTargetsManagement readTargets={data.result} />
      ) : null}

      {!(isFetching || isLoading) && !targetsCreated && data && !data.result ? <DashboardReadTargetsCreate /> : null}
    </div>
  );
};

export default DashboardReadTargetsHeader;

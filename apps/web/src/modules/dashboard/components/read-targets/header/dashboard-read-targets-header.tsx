import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type {
  DashboardReadTargetsCreatedGetResponse,
  DashboardReadTargetsGetResponse,
} from '@modules/api/types/dashboard-api.types';
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

  const queryClient = useQueryClient();
  // const readTargetsCreated = queryClient.getQueryData<DashboardReadTargetsCreatedGetResponse>([
  //   'dashboard-read-targets-created',
  // ]);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
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

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/api.types';
import DashboardReadTargetsEdit from './edit/dashboard-read-targets-edit';
import DashboardReadTargetsCreate from './create/dashboard-read-targets-create';

interface DashboardReadTargetsHeaderProps {
  isFetching: boolean;
  isLoading: boolean;
  data?: DashboardReadTargetsGetResponse;
}

const DashboardReadTargetsHeader: React.FC<DashboardReadTargetsHeaderProps> = (props) => {
  const { isFetching, isLoading, data } = props;

  const queryClient = useQueryClient();
  const readTargetsCreated = queryClient.getQueryData<boolean>(['dashboard-read-targets-created']);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
      <h2 className="text-2xl font-bold">Read Targets</h2>
      {isFetching || isLoading ? <Skeleton className="h-10 w-full md:w-1/4" /> : null}

      {!isFetching && readTargetsCreated && data ? (
        <DashboardReadTargetsEdit targetReadTargets={data.targetReadTargets} />
      ) : null}

      {!(isFetching || isLoading) && !readTargetsCreated ? <DashboardReadTargetsCreate /> : null}
    </div>
  );
};

export default DashboardReadTargetsHeader;

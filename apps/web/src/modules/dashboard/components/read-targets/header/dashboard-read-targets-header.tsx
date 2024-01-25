import React from 'react';
import type { ReadTargets } from '@read-quill/database';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardReadTargetsEdit from './edit/dashboard-read-targets-edit';
import DashboardReadTargetsCreate from './create/dashboard-read-targets-create';

interface DashboardReadTargetsHeaderProps {
  isFetching: boolean;
  targetReadTargets: Omit<ReadTargets, 'id' | 'userId'> | undefined;
}

const DashboardReadTargetsHeader: React.FC<DashboardReadTargetsHeaderProps> = (props) => {
  const { isFetching, targetReadTargets } = props;

  const queryClient = useQueryClient();
  const readTargetsCreated = queryClient.getQueryData<boolean>(['dashboard-read-targets-created']);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
      <h2 className="text-2xl font-bold">Read Targets</h2>
      {isFetching ? <Skeleton className="h-10 w-full md:w-1/4" /> : null}

      {!isFetching && readTargetsCreated && targetReadTargets ? (
        <DashboardReadTargetsEdit readTargets={targetReadTargets} />
      ) : null}

      {!isFetching && !readTargetsCreated ? <DashboardReadTargetsCreate /> : null}
    </div>
  );
};

export default DashboardReadTargetsHeader;

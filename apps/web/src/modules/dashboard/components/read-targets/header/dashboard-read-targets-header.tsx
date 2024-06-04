import React from 'react';
import { Skeleton, cn } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadTargetsCreate from './create/dashboard-read-targets-create';
import DashboardReadTargetsManagement from './management/dashboard-read-targets-management';

interface DashboardReadTargetsHeaderProps {
  isLoading: boolean;
  targetsCreated: boolean;
  data?: DashboardReadTargetsGetResponse;
}

const DashboardReadTargetsHeader: React.FC<DashboardReadTargetsHeaderProps> = (props) => {
  const { isLoading, targetsCreated, data } = props;

  return (
    <div
      className={cn('flex gap-2 items-center justify-between', !targetsCreated && 'flex-col sm:flex-row items-start')}
    >
      <h2 className="text-2xl font-bold">🎯 Read Targets</h2>
      {isLoading ? <Skeleton className="h-10 w-10" /> : null}

      {!isLoading && targetsCreated && data && data.result ? (
        <DashboardReadTargetsManagement readTargets={data.result} />
      ) : null}

      {!isLoading && !targetsCreated && data && !data.result ? <DashboardReadTargetsCreate /> : null}
    </div>
  );
};

export default DashboardReadTargetsHeader;

import React from 'react';
import { Skeleton, cn } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadTargetsCreate from './create/dashboard-read-targets-create';
import DashboardReadTargetsManagement from './management/dashboard-read-targets-management';
import { DashboardReadTargets } from '@modules/dashboard/types/dashboard.types';

interface DashboardReadTargetsHeaderProps {
  isLoading: boolean;
  targetsCreated: boolean;
  readTargets?: DashboardReadTargets;
}

const DashboardReadTargetsHeader: React.FC<DashboardReadTargetsHeaderProps> = (props) => {
  const { isLoading, targetsCreated, readTargets } = props;

  return (
    <div
      className={cn('flex gap-2 items-center justify-between', !targetsCreated && 'flex-col sm:flex-row items-start')}
    >
      <h2 className="text-xl font-bold">🎯 Read Targets</h2>
      {isLoading ? <Skeleton className="h-10 w-10" /> : null}

      {!isLoading && targetsCreated && readTargets ? (
        <DashboardReadTargetsManagement readTargets={readTargets} />
      ) : null}

      {!isLoading && !targetsCreated ? <DashboardReadTargetsCreate /> : null}
    </div>
  );
};

export default DashboardReadTargetsHeader;

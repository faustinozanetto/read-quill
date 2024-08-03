import React from 'react';

import DashboardReadStreakProgress from './dashboard-read-streak-progress';

import { DashboardReadStreakGetResponse } from '@modules/api/types/dashboard-api.types';

interface DashboardReadStreakInformationProps
  extends Omit<NonNullable<DashboardReadStreakGetResponse['data']>, 'readActivity'> {}

const DashboardReadStreakInformation: React.FC<DashboardReadStreakInformationProps> = (props) => {
  const { readStreak, totalPagesRead } = props;

  return (
    <>
      <div className="flex flex-wrap justify-between items-center">
        <h4 className="font-bold text-lg">Streak Information</h4>
        <p>
          <span className="font-bold">{totalPagesRead}</span> pages read in this streak!
        </p>
      </div>
      <div className="grid gap-2 md:gap-4 lg:grid-cols-3">
        <DashboardReadStreakProgress readStreak={readStreak} targetReadStreak={7} />
        <DashboardReadStreakProgress readStreak={readStreak} targetReadStreak={14} />
        <DashboardReadStreakProgress readStreak={readStreak} targetReadStreak={30} />
      </div>
    </>
  );
};

export default DashboardReadStreakInformation;

import React from 'react';

import { DashboardReadStreakGetResponse } from '@modules/api/types/dashboard-api.types';
import DashboardReadStreakCard from './dashboard-read-streak-card';

interface DashboardReadStreakActivityProps
  extends Omit<NonNullable<DashboardReadStreakGetResponse['data']>, 'totalPagesRead'> {}

const DashboardReadStreakActivity: React.FC<DashboardReadStreakActivityProps> = (props) => {
  const { readStreak, readActivity } = props;

  return (
    <>
      <div className="flex flex-wrap justify-between items-center">
        <h4 className="font-bold text-lg">Streak Activity</h4>
        <p>
          🎉 <span className="font-bold">{readStreak}</span> days in a row!
        </p>
      </div>
      <div className="grid grid-flow-col auto-cols-max gap-2 md:gap-4 overflow-x-auto pb-4">
        {readActivity.map((activity) => {
          return <DashboardReadStreakCard key={`read-streak-${activity.dateRead}`} readStreak={activity} />;
        })}
      </div>
    </>
  );
};

export default DashboardReadStreakActivity;

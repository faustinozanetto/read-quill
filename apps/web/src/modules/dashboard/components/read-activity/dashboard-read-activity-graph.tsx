'use client';

import React from 'react';
import { useReadActivity } from '@modules/dashboard/hooks//read-activity/use-read-activity';
import type { DashboardReadActivityEntry } from '@modules/dashboard/types/dashboard.types';
import { useReadActivityGraph } from '@modules/dashboard/hooks/read-activity/use-read-activity-graph';
import DashboardReadActivityGraphEntry from './dashboard-read-activity-graph-entry';

const DashboardReadActivityGraph: React.FC = () => {
  const { data } = useReadActivity();
  const { mapActivityToLevel, calculateStartDate } = useReadActivityGraph();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysPerRow = 50;

  const startDate = calculateStartDate(14);

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-max relative overflow-hidden border-spacing-[2px] my-2 border-separate m-auto">
        <tbody>
          {daysOfWeek.map((dayName, rowIndex) => (
            <tr className="h-[14px]" key={`row-${dayName}`}>
              <td className="text-left pr-2">
                <span className="text-sm float-left h-[14px]">{dayName}</span>
              </td>
              {Array.from({ length: daysPerRow }).map((_day, dayIndex) => {
                const dayNumber = rowIndex + dayIndex * 7 + 1;
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + dayNumber - 1);
                const formattedDate = currentDate.toISOString().split('T')[0];

                // Calculate activity level
                const activityValue = data.readActivity[formattedDate] ?? 0;

                const activity: DashboardReadActivityEntry = {
                  date: formattedDate,
                  level: mapActivityToLevel(activityValue),
                };

                return <DashboardReadActivityGraphEntry activity={activity} key={`read-activity-${formattedDate}`} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardReadActivityGraph;

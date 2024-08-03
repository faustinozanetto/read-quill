import React, { Suspense } from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardGreeting from './dashboard-greeting';
import DashboardReadTargets from './read-targets/dashboard-read-targets';
import DashboardReadRegistries from './read-registries/dashboard-read-registries';
import DashboardBooksProgress from './books-progress/dashboard-books-progress';
import DashboardAverageReadingTime from './average-reading-time/dashboard-average-reading-time';
import DashboardReadTargetsHistory from './read-targets-history/dashboard-read-targets-history';
import DashboardHasRead from './has-read/dashboard-has-read';
import DashboardLastRead from './last-read/dashboard-last-read';
import dynamic from 'next/dynamic';
import DashboardReadStreak from './read-streak/dashboard-read-streak';

const DashboardReadTrends = dynamic(() => import('./read-trends/dashboard-read-trends'));
const DashboardReadTimeDistribution = dynamic(
  () => import('./read-time-distribution/dashboard-read-time-distribution')
);
const DashboardReadActivity = dynamic(() => import('./read-activity/dashboard-read-activity'));
const DashboardBooksRatings = dynamic(() => import('./books-ratings/dashboard-books-ratings'));

const Dashboard: React.FC = () => {
  return (
    <section className="space-y-4">
      <DashboardGreeting />
      <DashboardHasRead />
      <div className="flex gap-4 2xl:flex-row flex-col flex-1">
        <DashboardReadTargets />
        <DashboardAverageReadingTime />
      </div>
      <DashboardReadStreak />
      <DashboardReadTargetsHistory />
      <DashboardLastRead />
      <DashboardReadRegistries />
      <DashboardBooksProgress />
      <div className="grid gap-4 xl:grid-cols-2">
        <DashboardReadTrends />
        <DashboardReadTimeDistribution />
        <DashboardReadActivity />
        <DashboardBooksRatings />
      </div>
    </section>
  );
};

export default Dashboard;

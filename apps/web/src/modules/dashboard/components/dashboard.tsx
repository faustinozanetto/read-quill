import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardGreeting from './dashboard-greeting';
import DashboardReadTargets from './read-targets/dashboard-read-targets';
import DashboardReadRegistries from './read-registries/dashboard-read-registries';
import DashboardBooksProgress from './books-progress/dashboard-books-progress';
import DashboardReadActivity from './read-activity/dashboard-read-activity';
import DashboardBooksRatings from './books-ratings/dashboard-books-ratings';
import DashboardAverageReadingTime from './average-reading-time/dashboard-average-reading-time';
import DashboardReadTrends from './read-trends/dashboard-read-trends';
import DashboardReadTimeDistribution from './read-time-distribution/dashboard-read-time-distribution';

const Dashboard: React.FC = () => {
  return (
    <section className="space-y-4">
      <DashboardGreeting />
      <div className="flex gap-4 2xl:flex-row flex-col">
        <DashboardReadTargets />
        <DashboardAverageReadingTime />
      </div>
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

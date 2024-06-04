import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardGreeting from './dashboard-greeting';
import DashboardReadTargets from './read-targets/dashboard-read-targets';
import DashboardReadRegistries from './read-registries/dashboard-read-registries';
import DashboardBooksProgress from './books-progress/dashboard-books-progress';
import DashboardReadInsights from './read-insights/dashboard-read-insights';
import DashboardReadActivity from './read-activity/dashboard-read-activity';
import DashboardBooksRatings from './books-ratings/dashboard-books-ratings';
import DashboardAverageReadingTime from './average-reading-time/dashboard-average-reading-time';

const Dashboard: React.FC = () => {
  return (
    <section className="mx-auto flex flex-col gap-4">
      <DashboardGreeting />
      <div className="flex gap-4 2xl:flex-row flex-col">
        <DashboardReadTargets />
        <DashboardAverageReadingTime />
      </div>
      <DashboardReadRegistries />
      <DashboardBooksProgress />
      <DashboardReadActivity />
      <DashboardBooksRatings />
    </section>
  );
};

export default Dashboard;

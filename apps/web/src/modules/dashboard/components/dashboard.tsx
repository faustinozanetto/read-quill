import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardGreeting from './dashboard-greeting';
import DashboardReadTargets from './read-targets/dashboard-read-targets';
import DashboardReadRegistries from './read-registries/dashboard-read-registries';
import DashboardBooksProgress from './books-progress/dashboard-books-progress';
import DashboardReadInsights from './read-insights/dashboard-read-insights';
import DashboardReadActivity from './read-activity/dashboard-read-activity';

const Dashboard: React.FC = () => {
  return (
    <section className="mx-auto flex flex-col gap-4">
      <DashboardGreeting />
      <DashboardReadTargets />
      <DashboardReadRegistries />
      <DashboardBooksProgress />
      <DashboardReadInsights />
      <DashboardReadActivity />
    </section>
  );
};

export default Dashboard;

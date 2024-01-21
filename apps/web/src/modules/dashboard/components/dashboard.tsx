'use client';

import React from 'react';
import { useBooks } from '../hooks/use-books';
import DashboardGreeting from './dashboard-greeting';
import DashboardReadTargets from './read-targets/dashboard-read-targets';
import DashboardReadRegistries from './read-registries/dashboard-read-registries';

const Dashboard: React.FC = () => {
  useBooks();

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
      <DashboardGreeting />
      <DashboardReadTargets />
      <DashboardReadRegistries />
    </section>
  );
};

export default Dashboard;

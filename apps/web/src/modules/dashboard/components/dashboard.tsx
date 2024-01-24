'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import type { Book } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import DashboardGreeting from './dashboard-greeting';
import DashboardReadTargets from './read-targets/dashboard-read-targets';
import DashboardReadRegistries from './read-registries/dashboard-read-registries';
import DashboardBooksProgress from './books-progress/dashboard-books-progress';
import DashboardReadInsights from './read-insights/dashboard-read-insights';
import DashboardReadActivity from './read-activity/dashboard-read-activity';

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  useQuery<Book[]>(['dashboard-books'], {
    initialData: [],

    queryFn: async () => {
      if (!session) return [];

      const url = new URL('/api/users/books', __URL__);
      url.searchParams.set('userId', session.user.id);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user books!');
      }

      const { books } = await response.json();
      return books;
    },
  });

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4">
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

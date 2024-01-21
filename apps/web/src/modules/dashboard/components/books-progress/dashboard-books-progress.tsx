'use client';

import React from 'react';
import { useBooksProgress } from '@modules/dashboard/hooks/use-books-progress';
import DashboardBooksProgressHeader from './header/dashboard-books-progress-header';
import DashboardBooksProgressEntries from './entries/dashboard-books-progress-entries';

const DashboardBooksProgress: React.FC = () => {
  const { booksProgress, isLoading } = useBooksProgress();

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <DashboardBooksProgressHeader />
      <p>Visualize your progress in your books here.</p>
      <DashboardBooksProgressEntries booksProgress={booksProgress} isLoading={isLoading} />
    </div>
  );
};

export default DashboardBooksProgress;

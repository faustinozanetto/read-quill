import type { Metadata } from 'next';
import { Suspense } from 'react';
import Dashboard from '@modules/dashboard/components/dashboard';
import { __URL__ } from '@modules/common/lib/common.constants';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description:
    'Welcome to your literary haven – the ReadQuill Dashboard. Navigate your reading world effortlessly, track your progress, and receive tailored recommendations. Your personalized literary adventure begins here, where every page turns into a unique experience.',
};

export default function DashboardPage(): React.JSX.Element {
  return (
    <div className="container my-4">
      <Suspense>
        <Dashboard />
      </Suspense>
    </div>
  );
}

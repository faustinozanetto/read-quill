import type { Metadata } from 'next';
import Dashboard from '@modules/dashboard/dashboard';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description:
    'Welcome to your literary haven – the ReadQuill Dashboard. Navigate your reading world effortlessly, track your progress, and receive tailored recommendations. Your personalized literary adventure begins here, where every page turns into a unique experience.',
};

export default async function DashboardPage(): Promise<React.JSX.Element> {
  return (
    <div className="container my-4">
      <Dashboard />
    </div>
  );
}

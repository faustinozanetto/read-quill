import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description:
    'Welcome to your literary haven – the ReadQuill Dashboard. Navigate your reading world effortlessly, track your progress, and receive tailored recommendations. Your personalized literary adventure begins here, where every page turns into a unique experience.',
};

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const user = await getCurrentUser();
  if (!user) return redirect('/sign-in');

  return <div className="container my-4"></div>;
}

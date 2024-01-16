import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description: 'Keep track and manage your shortened URLs in one place.',
};

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const user = await getCurrentUser();
  if (!user) return redirect('/sign-in');

  return <div className="container my-4"></div>;
}

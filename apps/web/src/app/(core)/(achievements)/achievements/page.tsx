import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { __URL__ } from '@modules/common/lib/common.constants';
import Achievements from '@modules/achievements/components/achievements';

export const metadata: Metadata = {
  title: 'User Achievements',
  description:
    'Welcome to your literary haven – the ReadQuill Dashboard. Navigate your reading world effortlessly, track your progress, and receive tailored recommendations. Your personalized literary adventure begins here, where every page turns into a unique experience.',
};

export default async function AchievementsPage(): Promise<React.JSX.Element> {
  const url = new URL('/api/achievements/check', __URL__);
  await fetch(url, { method: 'POST', headers: { Cookie: cookies().toString() } });

  return (
    <div className="container my-4">
      <Achievements />
    </div>
  );
}

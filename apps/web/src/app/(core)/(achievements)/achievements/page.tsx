import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { __URL__ } from '@modules/common/lib/common.constants';
import Achievements from '@modules/achievements/components/achievements';

export const metadata: Metadata = {
  title: 'User Achievements',
  description:
    'Explore your reading accomplishments on our achievements page. Track your progress, unlock milestones, and celebrate your literary journey with personalized achievements. Dive into a world of reading challenges and discover new horizons as you embark on your quest for knowledge and adventure.',
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

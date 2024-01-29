import React from 'react';
import HomeHero from '@modules/landing/components/sections/home-hero';
import HomeStats from '@modules/landing/components/sections/stats/home-stats';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { LandingStatsGetResponse } from '@modules/api/types/landing-api.types';
import HomeFeatures from '@modules/landing/components/sections/features/home-features';
import HomeFaq from '@modules/landing/components/sections/faq/home-faq';

export default async function Page(): Promise<React.JSX.Element> {
  const url = new URL('/api/landing/stats', __URL__);
  const response = await fetch(url, { method: 'GET' });
  let data: LandingStatsGetResponse = { activeUsers: 0, annotationsCreated: 0, booksRegistered: 0, pagesRead: 0 };
  if (response.ok) {
    data = await response.json();
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HomeHero />
      <HomeStats stats={data} />
      <HomeFeatures />
      <HomeFaq />
    </div>
  );
}

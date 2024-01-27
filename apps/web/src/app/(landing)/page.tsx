import React from 'react';
import HomeHero from '@modules/landing/components/sections/home-hero';
import HomeStats from '@modules/landing/components/sections/stats/home-stats';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { LandingStatsGetResponse } from '@modules/api/types/landing-api.types';
import HomeFeatures from '@modules/landing/components/sections/features/home-features';

export default async function Page(): Promise<React.JSX.Element> {
  const url = new URL('/api/landing/stats', __URL__);
  const response = await fetch(url, { method: 'GET' });
  const data: LandingStatsGetResponse = await response.json();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HomeHero />
      <HomeStats stats={data} />
      <HomeFeatures />
    </div>
  );
}

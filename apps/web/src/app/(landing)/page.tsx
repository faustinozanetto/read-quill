import React from 'react';
import HomeHero from '@modules/landing/components/sections/home-hero';
import HomeStats from '@modules/landing/components/sections/stats/home-stats';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { LandingStatsGetResponse } from '@modules/api/types/landing-api.types';
import HomeFeatures from '@modules/landing/components/sections/features/home-features';
import HomeFaq from '@modules/landing/components/sections/faq/home-faq';
import HomeCta from '@modules/landing/components/sections/cta/home-cta';
import HomeTestimonials from '@modules/landing/components/sections/testimonials/home-testimonials';

export default async function Page(): Promise<React.JSX.Element> {
  let data: LandingStatsGetResponse = { activeUsers: 0, annotationsCreated: 0, booksRegistered: 0, pagesRead: 0 };

  try {
    const url = new URL('/api/landing/stats', __URL__);
    const response = await fetch(url, { method: 'GET' });
    if (response.ok) {
      data = await response.json();
    }
  } catch (err) {
    /* empty */
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HomeHero />
      <HomeStats stats={data} />
      <HomeFeatures />
      <HomeFaq />
      <HomeTestimonials />
      <HomeCta />
    </div>
  );
}

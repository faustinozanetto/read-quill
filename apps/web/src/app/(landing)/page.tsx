import React from 'react';
import HomeHero from '@modules/landing/components/sections/home-hero';
import HomeStats from '@modules/landing/components/sections/stats/home-stats';
import HomeFeatures from '@modules/landing/components/sections/features/home-features';
import HomeFaq from '@modules/landing/components/sections/faq/home-faq';
import HomeCta from '@modules/landing/components/sections/cta/home-cta';
import HomeTestimonials from '@modules/landing/components/sections/testimonials/home-testimonials';
import { getLandingStats } from '@modules/landing/lib/landing.lib';

export const revalidate = 0;

export default async function Page(): Promise<React.JSX.Element> {
  const stats = await getLandingStats();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HomeHero />
      <HomeStats stats={stats} />
      <HomeFeatures />
      <HomeFaq />
      <HomeTestimonials />
      <HomeCta />
    </div>
  );
}

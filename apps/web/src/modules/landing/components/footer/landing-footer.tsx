import React from 'react';
import { FOOTER_CATEGORIES } from '@modules/landing/lib/footer.lib';
import MarketingLogo from '@modules/marketing/components/logos/marketing-logo';
import LandingFooterCategory from './landing-footer-category';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-primary flex p-4 md:p-6">
      <div className="container mx-auto max-w-5xl py-4 md:py-6 lg:py-10">
        <div className="mb-4 grid grid-cols-2 gap-6 sm:grid-cols-3 md:mb-8 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <MarketingLogo />
          </div>
          {FOOTER_CATEGORIES.map((category) => {
            return <LandingFooterCategory key={category.title} {...category} />;
          })}
        </div>

        <span className="text-sm">© 2023 Faustino Zanetto. All rights reserved</span>
      </div>
    </footer>
  );
};

export default LandingFooter;

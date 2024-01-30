import Link from 'next/link';
import React from 'react';
import MarketingLogo from '@modules/marketing/components/logos/marketing-logo';
import ThemeToggler from '@modules/theme/components/theme-toggler';

const LandingNavbar: React.FC = () => {
  return (
    <div className="bg-background/80 sticky left-0 right-0 top-0 z-[999] w-full border-b p-4 backdrop-blur-lg">
      <div className="mx-auto flex items-center justify-between sm:container">
        <Link aria-label="Home Page" href="/">
          <MarketingLogo />
        </Link>

        <ThemeToggler size="icon" variant="ghost" />
      </div>
    </div>
  );
};

export default LandingNavbar;

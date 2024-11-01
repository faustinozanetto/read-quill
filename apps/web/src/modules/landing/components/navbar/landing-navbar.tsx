import Link from 'next/link';
import React from 'react';
import MarketingLogo from '@modules/marketing/components/logos/marketing-logo';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import { Session } from 'next-auth';
import LandingNavbarLinks from './landing-navbar-links';
import LandingNavbarMobile from './landing-navbar-mobile';

interface LandingNavbarProps {
  session: Session | null;
}

const LandingNavbar: React.FC<LandingNavbarProps> = (props) => {
  const { session } = props;

  return (
    <div className="bg-background/80 sticky left-0 right-0 top-0 z-[999] w-full border-b p-4 backdrop-blur-lg h-20 ">
      <div className="mx-auto flex items-center justify-between sm:container">
        <LandingNavbarMobile session={session} />
        <Link aria-label="Home Page" href="/">
          <MarketingLogo textClassName="dark:fill-primary" />
        </Link>
        <nav className="ml-auto mr-4 hidden sm:flex">
          <LandingNavbarLinks session={session} />
        </nav>
        <ThemeToggler size="icon" variant="ghost" />
      </div>
    </div>
  );
};

export default LandingNavbar;

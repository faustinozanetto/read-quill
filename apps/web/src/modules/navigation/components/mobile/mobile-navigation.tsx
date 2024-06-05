import React from 'react';
import Link from 'next/link';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import { NAVIGATION_LINKS } from '@modules/navigation/data/navigation-lib';
import MarketingLogoSimple from '@modules/marketing/components/logos/marketing-logo-simple';
import NavigationLink from '../navigation-link';
import { auth } from 'auth';
import MobileUserNavigation from './mobile-user-navigation';

const MobileNavigation: React.FC = async () => {
  const session = await auth();

  return (
    <div className="md:hidden rounded-t-lg bg-primary/60 backdrop-blur-md border-t border-t-primary fixed inset-x-0 bottom-0 p-3 h-[64px] z-[100]">
      <div className="flex items-center justify-between gap-2">
        <Link href="/">
          <MarketingLogoSimple />
        </Link>
        <nav className="flex items-center justify-center gap-2">
          {NAVIGATION_LINKS.map((link) => {
            return <NavigationLink href={link.href} icon={link.icon} key={link.href} size="icon" />;
          })}

          {session && <MobileUserNavigation session={session} />}
        </nav>
        <ThemeToggler size="icon" variant="ghost" />
      </div>
    </div>
  );
};

export default MobileNavigation;

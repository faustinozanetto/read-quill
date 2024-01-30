'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { UserIcon } from '@read-quill/design-system';
import Link from 'next/link';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import { NAVIGATION_LINKS } from '@modules/navigation/data/navigation-lib';
import MarketingLogoSimple from '@modules/marketing/components/logos/marketing-logo-simple';
import NavigationLink from '../navigation-link';
import NavigationLogout from '../auth/navigation-logout';

const MobileNavigation: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="md:hidden bg-primary fixed inset-x-0 bottom-0 p-3 h-[64px] z-[100]">
      <div className="flex items-center justify-between gap-2">
        <Link href="/">
          <MarketingLogoSimple />
        </Link>
        <nav className="flex items-center justify-center gap-2">
          {NAVIGATION_LINKS.map((link) => {
            return <NavigationLink href={link.href} icon={link.icon} key={link.href} size="icon" />;
          })}

          {status === 'authenticated' ? (
            <>
              <NavigationLink href={`/users/${session.user.id}`} icon={<UserIcon />} size="icon" />
              <NavigationLogout size="icon" />
            </>
          ) : null}
        </nav>
        <ThemeToggler size="icon" variant="ghost" />
      </div>
    </div>
  );
};

export default MobileNavigation;

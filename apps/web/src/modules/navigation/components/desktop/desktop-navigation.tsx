'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { UserIcon } from '@read-quill/design-system';
import Link from 'next/link';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import { NAVIGATION_LINKS } from '@modules/navigation/data/navigation-lib';
import MarketingLogo from '@modules/marketing/components/logos/marketing-logo';
import NavigationLink from '../navigation-link';
import NavigationLogout from '../auth/navigation-logout';

const DesktopNavigation: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <aside className="hidden md:block drop-shadow-xl sticky inset-y-0 left-0 h-screen z-[100]">
      <div className="bg-primary float-left flex h-full flex-col gap-2 rounded-r-lg p-4 items-start">
        <Link href="/">
          <MarketingLogo />
        </Link>
        <nav className="flex grow flex-col gap-2 mt-4 w-full">
          {NAVIGATION_LINKS.map((link) => {
            return <NavigationLink className="w-full justify-start gap-2" key={link.href} {...link} />;
          })}
        </nav>

        <ThemeToggler className="w-full justify-start" variant="ghost">
          <span className="ml-2">Toggle Theme</span>
        </ThemeToggler>

        {status === 'authenticated' ? (
          <>
            <NavigationLink
              className="w-full justify-start"
              href={`/users/${session.user.id}`}
              icon={<UserIcon className="mr-2" />}
            >
              {session.user.name}
            </NavigationLink>
            <NavigationLogout className="w-full justify-start">Logout</NavigationLogout>
          </>
        ) : null}
      </div>
    </aside>
  );
};

export default DesktopNavigation;

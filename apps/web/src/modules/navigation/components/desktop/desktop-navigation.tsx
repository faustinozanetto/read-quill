'use client';

import React from 'react';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import { NAVIGATION_LINKS } from '@modules/navigation/data/navigation-lib';
import MarketingLogo from '@modules/marketing/components/logos/marketing-logo';
import { useSession } from 'next-auth/react';
import { UserIcon } from '@read-quill/design-system';
import NavigationLink from '../navigation-link';
import NavigationLogout from '../auth/navigation-logout';

const DesktopNavigation: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <aside className="hidden md:block sticky inset-y-0 left-0 h-screen">
      <div className="bg-primary float-left flex h-full flex-col gap-2 rounded-r-lg p-4 shadow items-start">
        <MarketingLogo />
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
            <NavigationLink href={`/users/${session.user.id}`} icon={<UserIcon className="mr-2" />}>
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

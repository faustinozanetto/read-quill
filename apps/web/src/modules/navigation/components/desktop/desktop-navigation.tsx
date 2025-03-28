import React from 'react';
import { SettingsIcon, UserIcon } from '@read-quill/design-system';
import Link from 'next/link';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import { NAVIGATION_LINKS } from '@modules/navigation/data/navigation-lib';
import MarketingLogo from '@modules/marketing/components/logos/marketing-logo';
import NavigationLink from '../navigation-link';
import NavigationLogout from '../auth/navigation-logout';
import { auth } from 'auth';

const DesktopNavigation: React.FC = async () => {
  const session = await auth();

  return (
    <aside className="hidden md:block sticky inset-y-0 left-0 h-screen z-[100]">
      <div className="bg-primary/10 border-r border-primary float-left flex h-full flex-col gap-2 rounded-r-lg p-4 items-start">
        <Link href="/" title="Home">
          <MarketingLogo textClassName="fill-primary" />
        </Link>
        <nav className="flex grow flex-col gap-2 mt-2 w-full">
          {NAVIGATION_LINKS.map((link) => {
            const { showInMobile, ...restLink } = link;

            return <NavigationLink className="w-full justify-start gap-2" key={link.href} {...restLink} />;
          })}
        </nav>

        <ThemeToggler className="w-full justify-start" variant="ghost-primary">
          <span className="ml-2">Toggle Theme</span>
        </ThemeToggler>

        {session && (
          <>
            <NavigationLink
              className="w-full justify-start"
              href={`/users/${session.user.id}`}
              icon={<UserIcon className="mr-2" />}
            >
              {session.user.name}
            </NavigationLink>
            <NavigationLink className="w-full justify-start" href="/settings" icon={<SettingsIcon className="mr-2" />}>
              Settings
            </NavigationLink>
            <NavigationLogout className="w-full justify-start">Logout</NavigationLogout>
          </>
        )}
      </div>
    </aside>
  );
};

export default DesktopNavigation;

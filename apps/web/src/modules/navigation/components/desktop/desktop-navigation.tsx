'use client';

import React from 'react';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import { NAVIGATION_LINKS } from '@modules/navigation/data/navigation-lib';
import NavigationLink from '../navigation-link';

const DesktopNavigation: React.FC = () => {
  return (
    <aside className="hidden md:block sticky inset-y-0 left-0 h-screen">
      <div className="bg-primary float-left flex h-full flex-col gap-4 rounded-r-lg p-4 shadow items-start">
        {/* <NavigationLogo /> */}
        <nav className="flex grow flex-col gap-2 w-full">
          {NAVIGATION_LINKS.map((link) => {
            return (
              <NavigationLink href={link.href} key={link.href}>
                {link.children}
              </NavigationLink>
            );
          })}
        </nav>
        <ThemeToggler variant="ghost">
          <span className="ml-2">Toggle Theme</span>
        </ThemeToggler>
      </div>
    </aside>
  );
};

export default DesktopNavigation;

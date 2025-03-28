import React from 'react';
import { BookIcon, MedalIcon, TagIcon, UsersIcon } from '@read-quill/design-system';
import type { NavigationLinkProps } from '../components/navigation-link';

interface NavigationLink extends Omit<NavigationLinkProps, 'isCompact'> {
  showInMobile: boolean;
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    href: '/dashboard',
    children: 'Dashboard',
    showInMobile: true,
    icon: (
      <svg
        className="h-5 w-5 stroke-primary-foreground md:stroke-current"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
  {
    href: '/library',
    children: 'Library',
    showInMobile: true,
    icon: <BookIcon className="stroke-primary-foreground md:stroke-current" />,
  },
  {
    href: '/achievements',
    children: 'Achievements',
    showInMobile: true,
    icon: <MedalIcon className="stroke-primary-foreground md:stroke-current" />,
  },
  // {
  //   href: '/challenges',
  //   children: 'Challenges',
  //   icon: <TargetIcon className="stroke-current" />,
  // },
  {
    href: '/community',
    children: 'Community',
    showInMobile: true,
    icon: <UsersIcon className="stroke-primary-foreground md:stroke-current" />,
  },
  {
    href: '/referrals',
    children: 'Referrals',
    showInMobile: false,
    icon: <TagIcon className="stroke-primary-foreground md:stroke-current" />,
  },
];

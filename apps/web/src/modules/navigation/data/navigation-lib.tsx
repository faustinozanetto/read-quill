import React from 'react';
import { BookIcon, MedalIcon, UsersIcon, TargetIcon } from '@read-quill/design-system';
import type { NavigationLinkProps } from '../components/navigation-link';

export const NAVIGATION_LINKS: Omit<NavigationLinkProps, 'isCompact'>[] = [
  {
    href: '/dashboard',
    children: 'Dashboard',
    icon: (
      <svg
        className="h-5 w-5 stroke-current"
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
    icon: <BookIcon className="stroke-current" />,
  },
  {
    href: '/achievements',
    children: 'Achievements',
    icon: <MedalIcon className="stroke-current" />,
  },
  // {
  //   href: '/challenges',
  //   children: 'Challenges',
  //   icon: <TargetIcon className="stroke-current" />,
  // },
  {
    href: '/community',
    children: 'Community',
    icon: <UsersIcon className="stroke-current" />,
  },
];

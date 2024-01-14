import React from 'react';
import { NavigationLinkProps } from '../components/navigation-link';

export const NAVIGATION_LINKS: Omit<NavigationLinkProps, 'isCompact'>[] = [
  {
    href: '/dashboard',
    children: (
      <>
        <svg
          className="h-5 w-5 mr-2 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
        Dashboard
      </>
    ),
  },
];

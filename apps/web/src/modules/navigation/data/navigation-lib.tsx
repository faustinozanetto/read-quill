import React from 'react';
import type { NavigationLinkProps } from '../components/navigation-link';
import { BookIcon } from '@read-quill/design-system';

export const NAVIGATION_LINKS: Omit<NavigationLinkProps, 'isCompact'>[] = [
  {
    href: '/dashboard',
    children: (
      <>
        <svg
          className="h-5 w-5 mr-2 stroke-current"
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
        Dashboard
      </>
    ),
  },
  {
    href: '/books',
    children: (
      <>
        <BookIcon className="mr-2 stroke-current" />
        Books
      </>
    ),
  },
];

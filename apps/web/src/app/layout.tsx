import '@styles/global.css';

import React from 'react';
import { Rubik } from 'next/font/google';
import { headers } from 'next/headers';
import { ToastsContainer } from '@read-quill/design-system';
import { getSession } from '@modules/auth/lib/auth.lib';
import Providers from './providers';

const rubikFont = Rubik({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <html className={rubikFont.variable} lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans subpixel-antialiased scroll-smooth">
        <Providers session={session}>
          {children}
          <ToastsContainer />
        </Providers>
      </body>
    </html>
  );
}

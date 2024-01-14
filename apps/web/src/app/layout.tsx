import '@styles/global.css';

import React from 'react';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { headers } from 'next/headers';

import { getSession } from '@modules/auth/lib/auth.lib';

const interFont = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <html className={interFont.variable} lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans subpixel-antialiased scroll-smooth">
        <div className="flex min-h-screen flex-row">
          <Providers session={session}>
            <div className="mb-[60px] flex flex-1 flex-col items-center p-2 sm:p-4 md:p-6 md:mb-0">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  );
}

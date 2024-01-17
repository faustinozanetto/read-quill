import '@styles/global.css';

import React from 'react';
import { Rubik } from 'next/font/google';
import { headers } from 'next/headers';
import { ToastsContainer } from '@read-quill/design-system';
import { getSession } from '@modules/auth/lib/auth.lib';
import Providers from './providers';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { siteConfig } from '@config/config';

const rubikFont = Rubik({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui'],
});

export const metadata: Metadata = {
  title: {
    default: `Home | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'Faustino Zanetto',
      url: 'https://www.faustinozanetto.com',
    },
  ],
  creator: 'Faustino Zanetto',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/readquill-banner.png`,
        width: 2000,
        height: 1500,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@faustinozanetto',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/readquill-banner.png`,
        width: 2000,
        height: 1500,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  icons: {
    shortcut: 'favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <html className={rubikFont.variable} lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans subpixel-antialiased scroll-smooth">
        <Providers session={session}>
          {children}
          <Analytics />
          <ToastsContainer />
        </Providers>
      </body>
    </html>
  );
}

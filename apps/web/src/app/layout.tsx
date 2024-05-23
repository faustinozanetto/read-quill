import '@styles/global.css';

import React from 'react';
import { Rubik } from 'next/font/google';
import { ToastsContainer } from '@read-quill/design-system';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { siteConfig } from '@config/config';
import Providers from './providers';
import { auth } from 'auth';
import Script from 'next/script';
import { __PROD__ } from '@modules/common/lib/common.constants';

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
        url: `${siteConfig.url}/readquill-banner.webp`,
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
        url: `${siteConfig.url}/readquill-banner.webp`,
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
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '32x32',
      url: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicons/favicon-16x16.png',
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html className={rubikFont.variable} lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans subpixel-antialiased scroll-smooth">
        <Providers session={session}>
          {children}
          {__PROD__ && (
            <Script
              defer
              src="https://cloud.umami.is/script.js"
              data-website-id="72aba3ec-bca1-4442-9805-bdf6fa1eab2b"
            />
          )}
          <Analytics />
          <ToastsContainer />
        </Providers>
      </body>
    </html>
  );
}

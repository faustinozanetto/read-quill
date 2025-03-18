import '@styles/global.css';

import React from 'react';
import { Rubik } from 'next/font/google';
import { ToastsContainer } from '@read-quill/design-system';
import type { Metadata } from 'next';
import { siteConfig } from '@config/config';
import Providers from './providers';
import { auth } from 'auth';
import { SpeedInsights } from '@vercel/speed-insights/next';
import UmaniAnalytics from '@modules/analytics/components/umani-analytics';
import { CORE_RICH_RESULTS } from '../modules/rich-results/lib/core-rich-results';
import { __PROD__ } from '@modules/common/lib/common.constants';
import Script from 'next/script';

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
      <head>
        {__PROD__ && (
          <>
            <Script strategy="beforeInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-SP5YH2222P" />
            <Script
              strategy="beforeInteractive"
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SP5YH2222', {
                page_path: window.location.pathname,
            });
        `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-background font-sans subpixel-antialiased scroll-smooth">
        <Providers session={session}>
          {children}
          <UmaniAnalytics />
          <SpeedInsights />
          <ToastsContainer />

          <Script
            strategy="beforeInteractive"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(CORE_RICH_RESULTS) }}
          />
        </Providers>
      </body>
    </html>
  );
}

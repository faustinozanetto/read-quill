import React from 'react';
import LandingFooter from '@modules/landing/components/footer/landing-footer';
import LandingNavbar from '@modules/landing/components/navbar/landing-navbar';
import { auth } from 'auth';

export default async function LandingLayout({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar session={session} />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}

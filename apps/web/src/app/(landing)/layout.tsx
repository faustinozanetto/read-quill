import React from 'react';
import LandingFooter from '@modules/landing/components/footer/landing-footer';
import LandingNavbar from '@modules/landing/components/navbar/landing-navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@modules/auth/lib/auth.lib';

export default async function LandingLayout({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar session={session} />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}

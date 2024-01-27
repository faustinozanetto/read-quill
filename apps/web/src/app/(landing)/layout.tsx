import React from 'react';
import LandingFooter from '@modules/landing/components/footer/landing-footer';
import LandingNavbar from '@modules/landing/components/navbar/landing-navbar';

export default function LandingLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}

import React from 'react';
import Navigation from '@modules/navigation/components/navigation';

export default function CoreLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen flex">
      <Navigation />
      <div className="mb-[64px] flex-1 md:mb-0 overflow-hidden container max-w-[100rem] my-4">{children}</div>
    </div>
  );
}

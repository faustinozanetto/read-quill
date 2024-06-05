import React from 'react';
import Navigation from '@modules/navigation/components/navigation';

export default function CoreLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen flex">
      <Navigation />
      <div className="mb-[64px] flex-1 md:mb-4 overflow-hidden container max-w-[110rem] my-4">{children}</div>
    </div>
  );
}

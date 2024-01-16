import React from 'react';
import Navigation from '@modules/navigation/components/navigation';

export default function CoreLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex min-h-screen flex-row">
      <Navigation />
      <div className="mb-[60px] flex flex-1 flex-col items-center md:mb-0">{children}</div>
    </div>
  );
}

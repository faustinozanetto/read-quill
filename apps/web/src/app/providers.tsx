'use client';

import React from 'react';
import { ToastsProvider } from '@read-quill/design-system';
import { ThemeProvider } from 'next-theme-kit';
import { SessionProvider } from 'next-auth/react';
import QueriesProvider from '@modules/queries/components/queries-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <SessionProvider>
      <QueriesProvider>
        <ThemeProvider useLocalStorage useSystem={false}>
          <ToastsProvider>{children}</ToastsProvider>
        </ThemeProvider>
      </QueriesProvider>
    </SessionProvider>
  );
};

export default Providers;

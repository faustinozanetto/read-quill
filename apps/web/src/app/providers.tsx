'use client';

import React from 'react';
import { ToastsProvider } from '@read-quill/design-system';
import { ThemeProvider } from 'next-theme-kit';
import QueriesProvider from '@modules/queries/components/queries-provider';
import { Session } from 'next-auth';
import { AuthProvider } from '@modules/auth/components/auth-provider';

interface ProvidersProps {
  session: Session | null;
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = (props) => {
  const { session, children } = props;

  return (
    <AuthProvider user={session?.user}>
      <QueriesProvider>
        <ThemeProvider useLocalStorage useSystem={false}>
          <ToastsProvider>{children}</ToastsProvider>
        </ThemeProvider>
      </QueriesProvider>
    </AuthProvider>
  );
};

export default Providers;

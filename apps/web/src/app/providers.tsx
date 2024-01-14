'use client';

import React from 'react';
import { ToastsProvider } from '@read-quill/design-system';
import { ThemeProvider } from 'next-theme-kit';
import AuthProvider from '@modules/auth/context/auth-context';
import { Session } from 'next-auth';

interface ProvidersProps {
  children: React.ReactNode;
  session: Session;
}

const Providers: React.FC<ProvidersProps> = (props) => {
  const { children, session } = props;

  return (
    <ThemeProvider useLocalStorage useSystem={false}>
      <ToastsProvider>
        <AuthProvider session={session}>{children}</AuthProvider>
      </ToastsProvider>
    </ThemeProvider>
  );
};

export default Providers;

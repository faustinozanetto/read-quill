'use client';

import React, { useState } from 'react';
import { ToastsProvider } from '@read-quill/design-system';
import { ThemeProvider } from 'next-theme-kit';
import { Session } from 'next-auth';
import { AuthProvider } from '@modules/auth/components/auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  session: Session | null;
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = (props) => {
  const { session, children } = props;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0,
          },
        },
      })
  );

  return (
    <AuthProvider user={session?.user}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider useLocalStorage useSystem={false}>
          <ToastsProvider>{children}</ToastsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Providers;

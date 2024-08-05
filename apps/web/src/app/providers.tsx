'use client';

import React, { useState } from 'react';
import { ToastsProvider } from '@read-quill/design-system';
import { ThemeProvider } from 'next-theme-kit';
import { Session } from 'next-auth';
import { AuthProvider } from '@modules/auth/components/auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  });
}

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
    <PostHogProvider client={posthog}>
      <AuthProvider user={session?.user}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider useLocalStorage useSystem={false}>
            <ToastsProvider>{children}</ToastsProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </PostHogProvider>
  );
};

export default Providers;

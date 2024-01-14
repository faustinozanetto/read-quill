'use client';

import React from 'react';
import { ToastsProvider } from '@read-quill/design-system';
import { ThemeProvider } from 'next-theme-kit';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <ThemeProvider useLocalStorage useSystem={false}>
      <ToastsProvider>{children}</ToastsProvider>
    </ThemeProvider>
  );
};

export default Providers;

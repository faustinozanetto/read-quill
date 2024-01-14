'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface QueriesProviderProps {
  children: React.ReactNode;
}

const QueriesProvider: React.FC<QueriesProviderProps> = (props) => {
  const { children } = props;

  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueriesProvider;

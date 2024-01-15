'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useQueriesStore } from '../state/queries.slice';

interface QueriesProviderProps {
  children: React.ReactNode;
}

const QueriesProvider: React.FC<QueriesProviderProps> = (props) => {
  const { children } = props;

  const { queryClient } = useQueriesStore();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueriesProvider;

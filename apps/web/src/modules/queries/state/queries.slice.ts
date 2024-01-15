import { create } from 'zustand';
import { QueryClient } from '@tanstack/react-query';

export interface QueriesSliceState {
  queryClient: QueryClient;
}

export const useQueriesStore = create<QueriesSliceState>(() => ({
  queryClient: new QueryClient(),
}));

import { User } from 'next-auth';
import { createStore } from 'zustand';

export interface AuthSliceState {
  user: User | null;
}

export type AuthStore = ReturnType<typeof createAuthStore>;

export const createAuthStore = (initProps?: Partial<AuthSliceState>) => {
  const DEFAULT_PROPS: AuthSliceState = {
    user: null,
  };
  return createStore<AuthSliceState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
  }));
};

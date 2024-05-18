import { User } from 'next-auth';
import { createStore } from 'zustand';

export interface AuthStoreState {
  user: User | null;
}

interface AuthStoreActions {}

export type AuthStore = ReturnType<typeof createAuthStore>;

export const createAuthStore = (initProps?: Partial<AuthStoreState>) => {
  const DEFAULT_PROPS: AuthStoreState = {
    user: null,
  };
  return createStore<AuthStoreState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
  }));
};

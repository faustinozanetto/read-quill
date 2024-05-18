import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { useStore } from 'zustand';
import { AuthStoreState } from '../store/auth.slice';

export const useAuthContext = <T>(selector: (state: AuthStoreState) => T): T => {
  const store = useContext(AuthContext);
  if (!store) throw new Error('Missing AuthContext.Provider in the tree');
  return useStore(store, selector);
};

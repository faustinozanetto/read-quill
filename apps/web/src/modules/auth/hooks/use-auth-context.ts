import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { useStore } from 'zustand';

export const useAuthContext = () => {
  const store = useContext(AuthContext);
  if (!store) throw new Error('Missing AuthContext.Provider in the tree');
  return useStore(store, (s) => s);
};

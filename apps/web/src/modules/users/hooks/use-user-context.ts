import { useContext } from 'react';
import { useStore } from 'zustand';
import { UserContext } from '../state/user-context';
import { UserSliceState } from '../state/user.slice';

export const useUserContext = <T>(selector: (state: UserSliceState) => T): T => {
  const store = useContext(UserContext);
  if (!store) throw new Error('Missing UserContext.Provider in the tree');

  return useStore(store, selector);
};

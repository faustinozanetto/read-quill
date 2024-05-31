'use client';

import { UserContext } from '@modules/users/state/user-context';
import { UserSliceState, UserStore, createUserStore } from '@modules/users/state/user.slice';
import { useRef } from 'react';

interface UserProviderProps extends UserSliceState {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = (props) => {
  const { children, ...rest } = props;
  const storeRef = useRef<UserStore>();
  if (!storeRef.current) {
    storeRef.current = createUserStore(rest);
  }
  return <UserContext.Provider value={storeRef.current}>{children}</UserContext.Provider>;
};

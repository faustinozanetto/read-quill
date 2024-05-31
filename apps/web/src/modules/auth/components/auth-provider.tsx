import { useRef } from 'react';
import { AuthStore, AuthSliceState, createAuthStore } from '../store/auth.slice';
import { AuthContext } from '../store/auth-context';

interface AuthProviderProps extends Partial<AuthSliceState> {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children, ...rest } = props;
  const storeRef = useRef<AuthStore>();
  if (!storeRef.current) {
    storeRef.current = createAuthStore(rest);
  }
  return <AuthContext.Provider value={storeRef.current}>{children}</AuthContext.Provider>;
};

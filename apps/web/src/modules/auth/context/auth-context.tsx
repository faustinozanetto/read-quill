'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export interface AuthProviderProps {
  children: React.ReactNode;
  session: Session;
}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;

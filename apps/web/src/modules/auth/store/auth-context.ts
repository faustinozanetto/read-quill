import { createContext } from 'react';
import { AuthStore } from './auth.slice';

export const AuthContext = createContext<AuthStore | null>(null);

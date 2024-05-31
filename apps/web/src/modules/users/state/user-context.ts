import { createContext } from 'react';
import { UserStore } from './user.slice';

export const UserContext = createContext<UserStore | null>(null);

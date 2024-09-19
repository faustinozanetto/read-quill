import { createStore } from 'zustand';
import { UserWithDetails } from '../types/user.types';

export interface UserSliceState {
  user: UserWithDetails;
}

export type UserStore = ReturnType<typeof createUserStore>;

export const createUserStore = (initProps: UserSliceState) => {
  return createStore<UserSliceState>()((set) => ({
    ...initProps,
  }));
};

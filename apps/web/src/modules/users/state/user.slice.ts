import { createStore } from 'zustand';
import { User } from '@read-quill/database';

export interface UserSliceState {
  user: User;
}

export type UserStore = ReturnType<typeof createUserStore>;

export const createUserStore = (initProps: UserSliceState) => {
  return createStore<UserSliceState>()((set) => ({
    ...initProps,
  }));
};

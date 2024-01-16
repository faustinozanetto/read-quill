import type { User } from '@read-quill/database';
import { create } from 'zustand';

export interface UserProfileSliceState {
  isLoading: boolean;
  user: User | null;
}

export interface UserProfileSliceActions {
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User) => void;
}

export const useUserProfileStore = create<UserProfileSliceState & UserProfileSliceActions>((set) => ({
  user: null,
  isLoading: true,
  setUser(user) {
    set({ user });
  },
  setIsLoading(isLoading) {
    set({ isLoading });
  },
}));

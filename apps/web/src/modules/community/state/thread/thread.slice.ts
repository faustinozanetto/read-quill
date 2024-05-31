import { ThreadWithDetails } from '@modules/community/types/community.types';
import { create } from 'zustand';

export interface ThreadSliceState {
  isLoading: boolean;
  thread: ThreadWithDetails | null;
}

export interface ThreadSliceActions {
  setIsLoading: (isLoading: boolean) => void;
  setThread: (thread: ThreadWithDetails) => void;
}

export const useThreadStore = create<ThreadSliceState & ThreadSliceActions>((set) => ({
  thread: null,
  isLoading: true,
  setThread(thread) {
    set({ thread });
  },
  setIsLoading(isLoading) {
    set({ isLoading });
  },
}));

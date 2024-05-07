import type { Thread } from '@read-quill/database';
import { create } from 'zustand';

export interface CommunityThreadSliceState {
  isLoading: boolean;
  thread: Thread | null;
}

export interface CommunityThreadSliceActions {
  setIsLoading: (isLoading: boolean) => void;
  setThread: (thread: Thread) => void;
}

export const useCommunityThreadStore = create<CommunityThreadSliceState & CommunityThreadSliceActions>((set) => ({
  thread: null,
  isLoading: true,
  setThread(thread) {
    set({ thread });
  },
  setIsLoading(isLoading) {
    set({ isLoading });
  },
}));

import { ThreadWithDetails } from '@modules/community/types/community.types';
import { create } from 'zustand';

export interface CommunityThreadSliceState {
  isLoading: boolean;
  thread: ThreadWithDetails | null;
}

export interface CommunityThreadSliceActions {
  setIsLoading: (isLoading: boolean) => void;
  setThread: (thread: ThreadWithDetails) => void;
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

import { ThreadWithDetails } from '@modules/community/types/community.types';
import { create } from 'zustand';

export interface CommunityThreadSliceState {
  thread: ThreadWithDetails | null;
}

export interface CommunityThreadSliceActions {
  setThread: (thread: ThreadWithDetails) => void;
}

export const useCommunityThreadStore = create<CommunityThreadSliceState & CommunityThreadSliceActions>((set) => ({
  thread: null,
  setThread(thread) {
    set({ thread });
  },
}));

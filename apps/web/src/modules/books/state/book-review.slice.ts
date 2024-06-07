import { create } from 'zustand';

export interface BookReviewSliceState {
  isOtherPending: boolean;
}

export interface BookReviewSliceActions {
  setIsOtherPending: (isOtherPending: boolean) => void;
}

export const useBookReviewStore = create<BookReviewSliceState & BookReviewSliceActions>((set) => ({
  isOtherPending: false,
  setIsOtherPending(isOtherPending) {
    set({ isOtherPending });
  },
}));

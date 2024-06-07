import { create } from 'zustand';

export interface ReviewLikeSliceState {
  isLikePending: boolean;
}

export interface ReviewLikeSliceActions {
  setIsLikePending: (isLikePending: boolean) => void;
}

export const useReviewLikeStore = create<ReviewLikeSliceState & ReviewLikeSliceActions>((set) => ({
  isLikePending: false,
  setIsLikePending(isLikePending) {
    set({ isLikePending });
  },
}));

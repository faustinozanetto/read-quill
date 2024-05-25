import { create } from 'zustand';
import type { BookWithDetails } from '../types/book.types';

export interface BookSliceState {
  isLoading: boolean;
  book: BookWithDetails | null;
}

export interface BookSliceActions {
  setIsLoading: (isLoading: boolean) => void;
  setBook: (book: BookWithDetails) => void;
}

export const useBookStore = create<BookSliceState & BookSliceActions>((set) => ({
  book: null,
  isLoading: true,
  setBook(book) {
    set({ book });
  },
  setIsLoading(isLoading) {
    set({ isLoading });
  },
}));

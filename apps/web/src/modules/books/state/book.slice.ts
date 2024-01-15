import { Book } from '@read-quill/database';
import { create } from 'zustand';

export interface BookSliceState {
  isLoading: boolean;
  book: Book | null;
}

export interface BookSliceActions {
  setIsLoading: (isLoading: boolean) => void;
  setBook: (book: Book) => void;
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

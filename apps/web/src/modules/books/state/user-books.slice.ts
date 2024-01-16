import { create } from 'zustand';
import type { Book } from '@read-quill/database';

export interface UserBooksSliceState {
  isLoading: boolean;
  books: Book[];
}

export interface UserBooksSliceActions {
  setIsLoading: (isLoading: boolean) => void;
  setUserBooks: (books: Book[]) => void;
}

export const useUserBooksStore = create<UserBooksSliceState & UserBooksSliceActions>((set) => ({
  books: [],
  isLoading: true,
  setUserBooks(books) {
    set({ books });
  },
  setIsLoading(isLoading) {
    set({ isLoading });
  },
}));

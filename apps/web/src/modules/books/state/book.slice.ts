import { Book } from '@read-quill/database';
import { create } from 'zustand';
import { BookWithReader } from '../types/book.types';

export interface BookSliceState {
  isLoading: boolean;
  book: BookWithReader | null;
}

export interface BookSliceActions {
  setIsLoading: (isLoading: boolean) => void;
  setBook: (book: BookWithReader) => void;
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

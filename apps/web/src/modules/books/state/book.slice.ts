import { createStore } from 'zustand';
import { BookWithDetails } from '../types/book.types';

export interface BookSliceState {
  book: BookWithDetails | null;
  isBookOwner: boolean;
}

export type BookStore = ReturnType<typeof createBookStore>;

export const createBookStore = (initProps: BookSliceState) => {
  return createStore<BookSliceState>()((set) => ({
    ...initProps,
  }));
};

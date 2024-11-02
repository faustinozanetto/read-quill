import { useContext } from 'react';
import { useStore } from 'zustand';
import { BookContext } from '../state/book-context';
import { BookSliceState } from '../state/book.slice';

export const useBookContext = (): BookSliceState => {
  const store = useContext(BookContext);
  if (!store) throw new Error('Missing BookContext.Provider in the tree');

  return useStore(store);
};

'use client';

import { useRef } from 'react';
import { BookSliceState, BookStore, createBookStore } from '../../state/book.slice';
import { BookContext } from '../../state/book-context';

interface BookProviderProps extends BookSliceState {
  children: React.ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = (props) => {
  const { children, ...rest } = props;
  const storeRef = useRef<BookStore>();
  if (!storeRef.current) {
    storeRef.current = createBookStore(rest);
  }
  return <BookContext.Provider value={storeRef.current}>{children}</BookContext.Provider>;
};

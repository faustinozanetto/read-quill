import { createContext } from 'react';
import { BookStore } from './book.slice';

export const BookContext = createContext<BookStore | null>(null);

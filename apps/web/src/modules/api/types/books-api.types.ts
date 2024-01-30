import type { Book } from '@read-quill/database';

export interface UserBooksGetResponse {
  books: Book[];
  hasMore: boolean;
  pageCount: number;
}

export interface BooksNamesGetResponse {
  booksNames: {
    id: string;
    name: string;
  }[];
}

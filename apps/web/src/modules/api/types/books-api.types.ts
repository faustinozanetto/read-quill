import type { Annotation, Book } from '@read-quill/database';

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

export interface BookAnnotationsGetResponse {
  annotations: Annotation[];
}

export interface BookAnnotationPostResponse {
  success: boolean;
}

export interface BooksUploadPostResponse {
  fileUrl: string;
}

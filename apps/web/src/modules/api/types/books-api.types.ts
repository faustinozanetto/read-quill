import { BookWithReader } from '@modules/books/types/book.types';
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

export interface BookAnnotationGetResponse {
  annotation: Annotation;
}

export interface BookAnnotationPostResponse {
  annotation: Annotation;
}

export interface BookAnnotationPatchResponse {
  annotation: Annotation;
}

export interface BookAnnotationDeleteResponse {
  success: boolean;
}

export interface BooksUploadPostResponse {
  fileUrl: string;
}

export interface BookFavouritePostResponse {
  success: boolean;
}

export interface BookDeleteResponse {
  success: boolean;
}

export interface BookPatchResponse {
  book: BookWithReader;
}

export interface BookReviewPostResponse {
  review: string;
}

export interface BookReviewPatchResponse {
  review: string;
}

export interface BookReviewDeleteResponse {
  success: boolean;
}

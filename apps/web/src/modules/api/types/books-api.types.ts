import { BookWithDetails } from '@modules/books/types/book.types';
import type { Annotation, Book, Image, ReadRegistry } from '@read-quill/database';

export interface UserBooksGetResponse {
  books: BookWithDetails[];
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

export interface BookUploadPostResponse {
  coverImage: Image;
}

export interface BookFavouritePostResponse {
  success: boolean;
}

export interface BookDeleteResponse {
  success: boolean;
}

export interface BookPatchResponse {
  book: BookWithDetails;
}

export interface BookGetResponse {
  book: BookWithDetails;
}

export interface BookPostResponse {
  book: BookWithDetails;
}

export interface BookRatingPostResponse {
  success: boolean;
}

export interface BookReadRegistriesGetResponse {
  readRegistries: ReadRegistry[];
  pageCount: number;
}

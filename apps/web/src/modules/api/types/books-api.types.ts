import { BookReviewDetailsLikesEntry, BookWithDetails } from '@modules/books/types/book.types';
import type { Image, ReadRegistry } from '@read-quill/database';
import { BaseApiResponse } from './api.types';
import { DashboardBookName } from '@modules/dashboard/types/dashboard.types';

export interface UserBooksGetResponse extends BaseApiResponse {
  data?: { books: BookWithDetails[]; hasMore: boolean; pageCount: number };
}

export interface BooksNamesGetResponse extends BaseApiResponse {
  data?: {
    booksNames: DashboardBookName[];
  };
}

export interface BookUploadPostResponse extends BaseApiResponse {
  data?: { coverImage: Image };
}

export interface BookFavouritePostResponse extends BaseApiResponse {
  data?: { isFavourite: boolean };
}

export interface BookDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface BookPatchResponse extends BaseApiResponse {
  data?: { book: BookWithDetails };
}

export interface BookGetResponse extends BaseApiResponse {
  data?: { book: BookWithDetails };
}

export interface BookPostResponse extends BaseApiResponse {
  data?: { book: BookWithDetails };
}

export interface BookRatingPostResponse extends BaseApiResponse {
  data?: { rating: number };
}

export interface BookReadRegistriesGetResponse extends BaseApiResponse {
  data?: { readRegistries: ReadRegistry[]; pageCount: number };
}

export interface BookReviewDetailsLikesGetResponse extends BaseApiResponse {
  data?: {
    reviewLikes: BookReviewDetailsLikesEntry[];
    pageCount: number;
  };
}

export interface BookInsightsGetResponse extends BaseApiResponse {
  data?: { progress: number; pagesRead: number; sessionsCount: number; lastRead?: Date };
}

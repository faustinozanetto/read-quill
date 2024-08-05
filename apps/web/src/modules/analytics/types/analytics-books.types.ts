import { Book } from '@read-quill/database';
import { AnalyticsContext } from './analytics.types';

interface AnalyticsBookCreatePayload {
  book: Book;
}

interface AnalyticsBookRatingPayload {
  bookId: string;
  rating: number;
}

export interface AnalyticsBooksAPI {
  trackCreate: (context: AnalyticsContext, payload: AnalyticsBookCreatePayload) => void;
  trackRating: (context: AnalyticsContext, payload: AnalyticsBookRatingPayload) => void;
  trackAnnotation: (context: AnalyticsContext, payload: AnalyticsBookRatingPayload) => void;
}

import { AnalyticsReadRegistriesAPI } from './analytics-read-registries.types';
import { AnalyticsBooksAPI } from './analytics-books.types';

export interface AnalyticsContext {
  user: {
    id: string;
    name: string;
  };
}

export interface AnalyticsAPI {
  readRegistries: AnalyticsReadRegistriesAPI;
  books: AnalyticsBooksAPI;
}

import posthog from 'posthog-js';
import { AnalyticsAPI } from '../types/analytics.types';
import { AnalyticsReadRegistriesAPI } from '../types/analytics-read-registries.types';
import { AnalyticsBooksAPI } from '../types/analytics-books.types';

const readRegistries: AnalyticsReadRegistriesAPI = {
  trackCreate: (context, payload) => {
    posthog.capture('read_registry_created', {
      context,
      payload,
    });
  },
};

const books: AnalyticsBooksAPI = {
  trackCreate: (context, payload) => {
    posthog.capture('book_created', {
      context,
      payload,
    });
  },
  trackRating: (context, payload) => {
    posthog.capture('book_rating', {
      context,
      payload,
    });
  },
};

export const analytics: AnalyticsAPI = {
  readRegistries,
  books,
};

import { AnalyticsAPI, AnalyticsReadRegistriesAPI } from '../types/analytics.types';

const readRegistries: AnalyticsReadRegistriesAPI = {
  trackCreate: (context, payload) => {
    (window as any)?.gtag('event', 'read_registry_created', {
      value: {
        context,
        payload,
      },
    });
  },
};

export const analytics: AnalyticsAPI = {
  readRegistries,
};

import { AnalyticsAPI, AnalyticsReadRegistriesAPI } from '../types/analytics.types';

const readRegistries: AnalyticsReadRegistriesAPI = {
  trackCreate: (context, payload) => {
    if (!window.gtag) return;

    window.gtag('event', 'read_registry_created', {
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

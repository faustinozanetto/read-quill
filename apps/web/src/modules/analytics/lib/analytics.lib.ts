import { sendGAEvent } from '@next/third-parties/google';
import { AnalyticsAPI, AnalyticsReadRegistriesAPI } from '../types/analytics.types';

const readRegistries: AnalyticsReadRegistriesAPI = {
  trackCreate: (context, payload) => {
    sendGAEvent({
      event: 'read_registry_created',
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

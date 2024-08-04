import { ReadRegistry } from '@read-quill/database';

export interface AnalyticsContext {
  user: {
    id: string;
    name: string;
  };
}

interface AnalyticsReadRegistriesCreatePayload {
  readRegistry: ReadRegistry;
}

export interface AnalyticsReadRegistriesAPI {
  trackCreate: (context: AnalyticsContext, payload: AnalyticsReadRegistriesCreatePayload) => void;
}

export interface AnalyticsAPI {
  readRegistries: AnalyticsReadRegistriesAPI;
}

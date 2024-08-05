import { ReadRegistry } from '@read-quill/database';
import { AnalyticsContext } from './analytics.types';

interface AnalyticsReadRegistryCreatePayload {
  readRegistry: ReadRegistry;
}

export interface AnalyticsReadRegistriesAPI {
  trackCreate: (context: AnalyticsContext, payload: AnalyticsReadRegistryCreatePayload) => void;
}

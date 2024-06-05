import { BaseApiResponse } from './api.types';

export type LandingStatType = 'booksRegistered' | 'pagesRead' | 'activeUsers' | 'annotationsCreated';

export interface LandingStatsGetResponse extends BaseApiResponse {
  data?: { stats: LandingStats };
}

export type LandingStats = Record<LandingStatType, number>;

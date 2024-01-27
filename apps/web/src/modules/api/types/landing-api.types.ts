export type LandingStatType = 'booksRegistered' | 'pagesRead' | 'activeUsers' | 'annotationsCreated';

export type LandingStatsGetResponse = Record<LandingStatType, number>;

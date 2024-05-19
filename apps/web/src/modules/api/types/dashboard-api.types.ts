import type { ReadRegistry, ReadTargets } from '@read-quill/database';

export type DashboardReadRegistry = ReadRegistry & {
  book: {
    coverImage: string;
    name: string;
    pageCount: number;
  };
};

export interface DashboardReadTargetsGetResponse {
  result: {
    targetReadTargets: Pick<ReadTargets, 'daily' | 'weekly' | 'monthly'>;
    readTargets: Pick<ReadTargets, 'daily' | 'weekly' | 'monthly'>;
  } | null;
}

export interface DashboardReadTargetsPostResponse {
  success: boolean;
}

export interface DashboardReadTargetsPatchResponse {
  targetReadTargets: Pick<ReadTargets, 'daily' | 'weekly' | 'monthly'>;
}

export interface DashboardReadTargetsDeleteResponse {
  success: boolean;
}

export interface DashboardReadTargetsCreatedGetResponse {
  created: boolean;
}

export interface DashboardReadRegistriesGetResponse {
  readRegistries: DashboardReadRegistry[];
  pageCount: number;
}

export interface DashboardReadInsightsTrendsGetResponse {
  trends: {
    date: string;
    registries: ReadRegistry[];
  }[];
}

export interface DashboardBooksProgressGetResponse {
  booksProgress: {
    id: string;
    progress: number;
    cover: string;
    name: string;
  }[];
  pageCount: number;
  hasMore: boolean;
}

export interface DashboardReadInsightsTimeDistributionGetResponse {
  timeDistribution: {
    date: string;
    pagesRead: number;
  }[];
}

export interface DashboardReadActivityGetResponse {
  readActivity: Record<string, number>;
}

export interface DashboardBooksRatingsGetResponse {
  booksRatings: {
    rating: number;
    count: number;
  }[];
}

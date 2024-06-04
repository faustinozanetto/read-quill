import { BookProgressEntry } from '@modules/dashboard/types/dashboard.types';
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

export interface DashboardReadTrendsGetResponse {
  trends: {
    date: string;
    registries: ReadRegistry[];
  }[];
}

export interface DashboardBooksProgressGetResponse {
  booksProgress: BookProgressEntry[];
  pageCount: number;
  hasMore: boolean;
}

export interface DashboardReadTimeDistributionGetResponse {
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

export interface AverageReadingTimeGetResponse {
  readingTimes: {
    daily: {
      current: number;
      past: number;
    };
    weekly: {
      current: number;
      past: number;
    };
    monthly: {
      current: number;
      past: number;
    };
  };
}

import {
  BookProgressEntry,
  DashboardBookRatingEntry,
  DashboardLastReadEntry,
  DashboardReadStreakActivityEntry,
  DashboardReadTargetHistoryEntry,
  DashboardReadTargets,
  DashboardReadTrendEntry,
} from '@modules/dashboard/types/dashboard.types';
import type { ReadRegistry, ReadTargets } from '@read-quill/database';
import { BaseApiResponse } from './api.types';
import { ReadActivty } from '@modules/common/types/common.types';

export type DashboardReadRegistry = ReadRegistry & {
  book: {
    name: string;
  };
};

export interface DashboardReadTargetsGetResponse extends BaseApiResponse {
  data?: {
    readTargets: DashboardReadTargets;
  };
}

export interface DashboardReadTargetsPostResponse extends BaseApiResponse {
  data?: { readTargets: ReadTargets };
}

export interface DashboardReadTargetsPatchResponse extends BaseApiResponse {
  data?: { readTargets: ReadTargets };
}

export interface DashboardReadTargetsDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface DashboardReadTargetsCreatedGetResponse extends BaseApiResponse {
  data?: { created: boolean };
}

export interface DashboardReadRegistriesGetResponse extends BaseApiResponse {
  data?: { readRegistries: DashboardReadRegistry[]; pageCount: number };
}

export interface DashboardReadTrendsGetResponse extends BaseApiResponse {
  data?: {
    trends: DashboardReadTrendEntry[];
  };
}

export interface DashboardBooksProgressGetResponse extends BaseApiResponse {
  data?: { booksProgress: BookProgressEntry[]; pageCount: number; hasMore: boolean };
}

export interface DashboardReadTimeDistributionGetResponse extends BaseApiResponse {
  data?: {
    timeDistribution: {
      date: string;
      pagesRead: number;
    }[];
  };
}

export interface DashboardReadActivityGetResponse extends BaseApiResponse {
  data?: { readActivity: ReadActivty };
}

export interface DashboardBooksRatingsGetResponse extends BaseApiResponse {
  data?: {
    booksRatings: DashboardBookRatingEntry[];
  };
}

export interface AverageReadingTimeGetResponse extends BaseApiResponse {
  data?: {
    averageReadingTimes: {
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
  };
}

export interface DashboardReadTargetsHistoryGetResponse extends BaseApiResponse {
  data?: {
    readTargets: Pick<ReadTargets, 'daily' | 'weekly' | 'monthly'>;
    historyEntries: DashboardReadTargetHistoryEntry[];
    hasMore: boolean;
    nextCursor: string | null;
  };
}

export interface DashboardHasReadGetResponse extends BaseApiResponse {
  data?: {
    hasRead: boolean;
  };
}

export interface DashboardLastReadGetResponse extends BaseApiResponse {
  data?: {
    books: DashboardLastReadEntry[];
  };
}

export interface DashboardReadStreakGetResponse extends BaseApiResponse {
  data?: {
    readStreak: number;
    readActivity: DashboardReadStreakActivityEntry[];
    totalPagesRead: number;
  };
}

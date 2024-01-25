import type { ReadRegistry } from '@read-quill/database';

export type DashboardReadRegistry = ReadRegistry & {
  book: {
    coverImage: string;
    name: string;
    pageCount: number;
  };
};

export interface DashboardReadRegistriesGetResponse {
  readRegistries: DashboardReadRegistry[];
  pageCount: number;
}

export interface DashboardReadInsightsTrendsGetResponse {
  trends: Record<string, ReadRegistry[]>;
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

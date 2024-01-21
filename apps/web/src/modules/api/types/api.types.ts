import type { ReadRegistry } from '@read-quill/database';

export type DashboardReadRegistry = ReadRegistry & {
  book: {
    coverImage: string;
    name: string;
    pageCount: number;
  };
};

export interface DashboardReadRegistriesGETResponse {
  readRegistries: DashboardReadRegistry[];
  pageCount: number;
}

import { ThreadWithAuthor } from '@modules/community/types/community.types';

export interface CommunityThreadsGetResponse {
  threads: ThreadWithAuthor[];
  pageCount: number;
  hasMore: boolean;
}

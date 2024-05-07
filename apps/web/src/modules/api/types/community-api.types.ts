import { ThreadComment } from '@read-quill/database';
import { ThreadWithDetails } from '@modules/community/types/community.types';

export interface ThreadsCommunityGetResponse {
  threads: ThreadWithDetails[];
  pageCount: number;
  hasMore: boolean;
}

export interface ThreadsGetResponse {
  thread: ThreadWithDetails;
}

export interface ThreadCommentsGetResponse {
  comments: ThreadComment[];
  pageCount: number;
  hasMore: boolean;
}

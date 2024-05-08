import { ThreadCommentNode, ThreadWithDetails } from '@modules/community/types/community.types';

export interface ThreadsCommunityGetResponse {
  threads: ThreadWithDetails[];
  pageCount: number;
  hasMore: boolean;
}

export interface ThreadsGetResponse {
  thread: ThreadWithDetails;
}

export interface ThreadCommentsGetResponse {
  comments: ThreadCommentNode[];
  pageCount: number;
  hasMore: boolean;
}

export interface ThreadCommentPostResponse {
  success: true;
}

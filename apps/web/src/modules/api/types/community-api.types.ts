import { ThreadCommentNode, ThreadWithDetails } from '@modules/community/types/community.types';

export interface ThreadsCommunityGetResponse {
  threads: ThreadWithDetails[];
  pageCount: number;
  hasMore: boolean;
}

export interface ThreadGetResponse {
  thread: ThreadWithDetails;
}

export interface ThreadPatchResponse {
  success: boolean;
}

export interface ThreadDeleteResponse {
  success: boolean;
}

export interface ThreadCommentsGetResponse {
  comments: ThreadCommentNode[];
  pageCount: number;
  hasMore: boolean;
}

export interface ThreadCommentPostResponse {
  success: boolean;
}

export interface ThreadCommentPatchResponse {
  success: boolean;
}

export interface ThreadCommentDeleteResponse {
  success: boolean;
}

export interface ThreadCommentReplyPostResponse {
  success: boolean;
}

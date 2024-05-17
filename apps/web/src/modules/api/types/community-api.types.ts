import { CommunityTopUser, ThreadCommentNode, ThreadWithDetails } from '@modules/community/types/community.types';

export interface ThreadsCommunityGetResponse {
  threads: ThreadWithDetails[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ThreadsCommunityTrendingGetResponse {
  threads: ThreadWithDetails[];
}

export interface CommunityTopUsersGetResponse {
  topUsers: CommunityTopUser[];
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

export interface ThreadFavouritePostResponse {
  success: boolean;
  threadFavourite: boolean;
}

export interface ThreadFavouriteGetResponse {
  isFavourite: boolean;
}

export interface ThreadVotePostResponse {
  success: boolean;
  alredyVoted: boolean;
}

export interface ThreadsUserGetResponse {
  threads: ThreadWithDetails[];
  nextCursor: string | null;
  hasMore: boolean;
}

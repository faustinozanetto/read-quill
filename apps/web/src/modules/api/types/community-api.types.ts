import { CommunityTopUser, ThreadCommentNode, ThreadWithDetails } from '@modules/community/types/community.types';
import { ThreadAttachment } from '@read-quill/database';

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

export interface ThreadPostResponse {
  thread: ThreadWithDetails;
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

export interface ThreadVoteGetResponse {
  votes: number;
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

export interface FavouriteThreadsCommunityGetResponse {
  threads: ThreadWithDetails[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ThreadAttachmentUploadPostResponse {
  attachmentUrls: Record<string, string>;
}

export interface ThreadAttachmentsGetResponse {
  attachments: ThreadAttachment[];
}

export interface ThreadAttachmentDeleteResponse {
  success: boolean;
}

export interface ThreadViewGetResponse {
  views: { unique: number; total: number };
}

export interface ThreadViewPostResponse {
  success: boolean;
}

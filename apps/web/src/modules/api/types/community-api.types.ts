import {
  CommunityTopUser,
  ThreadAttachmentWithImage,
  ThreadCommentNode,
  ThreadViews,
  ThreadWithDetails,
} from '@modules/community/types/community.types';
import { Image, ThreadAttachment, ThreadComment } from '@read-quill/database';

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
  threadComment: ThreadComment;
}

export interface ThreadCommentPatchResponse {
  threadComment: ThreadComment;
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
  attachmentImages: Image[];
}

export interface ThreadAttachmentsGetResponse {
  attachments: ThreadAttachmentWithImage[];
}

export interface ThreadAttachmentDeleteResponse {
  success: boolean;
}

export interface ThreadViewGetResponse {
  views: ThreadViews;
}

export interface ThreadViewPostResponse {
  success: boolean;
}

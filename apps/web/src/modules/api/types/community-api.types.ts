import {
  CommunityTopUser,
  ThreadAttachmentWithImage,
  ThreadCommentNode,
  ThreadViews,
  ThreadWithDetails,
} from '@modules/community/types/community.types';
import { Image, ThreadComment } from '@read-quill/database';
import { BaseApiResponse } from './api.types';

export interface ThreadsCommunityGetResponse extends BaseApiResponse {
  data?: { threads: ThreadWithDetails[]; nextCursor: string | null; hasMore: boolean };
}

export interface ThreadsCommunityTrendingGetResponse extends BaseApiResponse {
  data?: { threads: ThreadWithDetails[] };
}

export interface CommunityTopUsersGetResponse extends BaseApiResponse {
  data?: { topUsers: CommunityTopUser[] };
}

export interface ThreadGetResponse extends BaseApiResponse {
  data?: { thread: ThreadWithDetails };
}

export interface ThreadPatchResponse extends BaseApiResponse {
  data?: { thread: ThreadWithDetails };
}

export interface ThreadPostResponse extends BaseApiResponse {
  data?: { thread: ThreadWithDetails };
}

export interface ThreadDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface ThreadCommentsGetResponse extends BaseApiResponse {
  data?: { comments: ThreadCommentNode[]; pageCount: number; hasMore: boolean };
}

export interface ThreadCommentPostResponse extends BaseApiResponse {
  data?: { threadComment: ThreadComment };
}

export interface ThreadCommentPatchResponse extends BaseApiResponse {
  data?: { threadComment: ThreadComment };
}

export interface ThreadCommentDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface ThreadCommentReplyPostResponse extends BaseApiResponse {
  data?: { threadComment: ThreadComment };
}

export interface ThreadFavouritePostResponse extends BaseApiResponse {
  data?: { threadFavourite: boolean };
}

export interface ThreadFavouriteGetResponse extends BaseApiResponse {
  data?: { isFavourite: boolean };
}

export interface ThreadVoteGetResponse extends BaseApiResponse {
  data?: { votes: number };
}

export interface ThreadVotePostResponse extends BaseApiResponse {
  data?: { alredyVoted: boolean };
}

export interface ThreadsUserGetResponse extends BaseApiResponse {
  data?: { threads: ThreadWithDetails[]; nextCursor: string | null; hasMore: boolean };
}

export interface FavouriteThreadsCommunityGetResponse extends BaseApiResponse {
  data?: { threads: ThreadWithDetails[]; nextCursor: string | null; hasMore: boolean };
}

export interface ThreadAttachmentUploadPostResponse extends BaseApiResponse {
  data?: { attachmentImages: Image[] };
}

export interface ThreadAttachmentsGetResponse extends BaseApiResponse {
  data?: { attachments: ThreadAttachmentWithImage[] };
}

export interface ThreadAttachmentDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface ThreadViewGetResponse extends BaseApiResponse {
  data?: { views: ThreadViews };
}

export interface ThreadViewPostResponse extends BaseApiResponse {
  data?: { success: boolean };
}

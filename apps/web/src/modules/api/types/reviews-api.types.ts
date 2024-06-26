import { Review, ReviewLike } from '@read-quill/database';
import { BaseApiResponse } from './api.types';

export interface ReviewGetResponse extends BaseApiResponse {
  data?: { review: Review | null };
}

export interface ReviewPostResponse extends BaseApiResponse {
  data?: { review: Review };
}

export interface ReviewPatchResponse extends BaseApiResponse {
  data?: { review: Review };
}

export interface ReviewDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface ReviewLikeGetResponse extends BaseApiResponse {
  data?: { reviewLike: ReviewLike };
}

export interface ReviewLikePostResponse extends BaseApiResponse {
  data?: { reviewLike: ReviewLike };
}

export interface ReviewLikeDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface ReviewLikeStatusGetResponse extends BaseApiResponse {
  data?: { liked: boolean; disliked: boolean };
}

export interface ReviewLikeCountGetResponse extends BaseApiResponse {
  data?: { likeCount: number; dislikeCount: number };
}

import { Review } from '@read-quill/database';

export interface ReviewGetResponse {
  review: Review | null;
}

export interface ReviewPostResponse {
  review: Review;
}

export interface ReviewPatchResponse {
  review: Review;
}

export interface ReviewDeleteResponse {
  success: boolean;
}

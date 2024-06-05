import { Review } from '@read-quill/database';
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

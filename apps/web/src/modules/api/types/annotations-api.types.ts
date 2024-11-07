import { Annotation } from '@read-quill/database';
import { BaseApiResponse } from './api.types';

export interface BookAnnotationsGetResponse extends BaseApiResponse {
  data?: { annotations: Annotation[]; hasMore: boolean; pageCount: number };
}

export interface BookAnnotationsTimeGetResponse extends BaseApiResponse {
  data?: { annotations: Record<string, Annotation[]> };
}

export interface AnnotationGetResponse extends BaseApiResponse {
  data?: { annotation: Annotation };
}

export interface AnnotationPostResponse extends BaseApiResponse {
  data?: { annotation: Annotation };
}

export interface AnnotationPatchResponse extends BaseApiResponse {
  data?: { annotation: Annotation };
}

export interface AnnotationDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

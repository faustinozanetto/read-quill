import { Annotation } from '@read-quill/database';

export interface BookAnnotationsGetResponse {
  annotations: Annotation[];
  hasMore: boolean;
  pageCount: number;
}

export interface AnnotationGetResponse {
  annotation: Annotation;
}

export interface AnnotationPostResponse {
  annotation: Annotation;
}

export interface AnnotationPatchResponse {
  annotation: Annotation;
}

export interface AnnotationDeleteResponse {
  success: boolean;
}

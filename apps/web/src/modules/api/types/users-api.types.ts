import { User } from '@read-quill/database';
import { BaseApiResponse } from './api.types';

export interface UserGetResponse extends BaseApiResponse {
  data?: { user: User };
}

export interface UserDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface UserMemberSinceGetResponse extends BaseApiResponse {
  data?: { memberSince: Date };
}

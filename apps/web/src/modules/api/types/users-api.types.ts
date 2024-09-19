import { Image } from '@read-quill/database';
import { BaseApiResponse } from './api.types';
import { UserWithDetails } from '@modules/users/types/user.types';

export interface UserGetResponse extends BaseApiResponse {
  data?: { user: UserWithDetails };
}

export interface UserDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface UserMemberSinceGetResponse extends BaseApiResponse {
  data?: { memberSince: Date };
}

export interface UserProfileCompletedGetResponse extends BaseApiResponse {
  data?: { profileCompleted: boolean };
}

export interface UserCompleteProfilePostResponse extends BaseApiResponse {
  data?: { success: boolean };
}

export interface UserAvatarUploadPostResponse extends BaseApiResponse {
  data?: { avatarImage: Image };
}

export interface UserAvatarDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}

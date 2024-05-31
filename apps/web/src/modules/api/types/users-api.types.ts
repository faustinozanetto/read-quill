import { User } from '@read-quill/database';

export interface UserGetResponse {
  user: User;
}

export interface UserDeleteResponse {
  success: boolean;
}

export interface UserMemberSinceGetResponse {
  memberSince: Date;
}

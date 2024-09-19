import { Image, User } from '@read-quill/database';

export interface UserWithDetails extends User {
  avatar: Image | null;
}

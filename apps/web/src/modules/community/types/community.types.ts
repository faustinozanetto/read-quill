import { Thread, User } from '@read-quill/database';

export interface ThreadWithDetails extends Thread, ThreadAuthor, ThreadCommentsCount {}

export interface ThreadAuthor {
  author: {
    name: User['name'];
    image: User['image'];
  };
}

export interface ThreadCommentsCount {
  commentsCount: number;
}

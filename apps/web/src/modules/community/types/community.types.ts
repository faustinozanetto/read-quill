import { Thread, ThreadComment, User } from '@read-quill/database';

export interface ThreadWithDetails extends Thread, ThreadAuthor, ThreadCommentsCount {}

export interface ThreadAuthor {
  author: {
    id: User['id'];
    name: User['name'];
    image: User['image'];
  };
}

export interface ThreadCommentsCount {
  commentsCount: number;
}

export interface ThreadCommentWithAuthor extends Omit<ThreadComment, 'authorId'>, ThreadAuthor {}

export interface ThreadCommentNode {
  comment: ThreadCommentWithAuthor;
  replies: ThreadCommentNode[];
}

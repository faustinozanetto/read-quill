import { Image, Thread, ThreadAttachment, ThreadComment, User } from '@read-quill/database';

export interface ThreadWithDetails extends Thread, ThreadAuthor, ThreadCommentsCount {
  views: ThreadViews;
}

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

export interface ThreadViews {
  unique: number;
  total: number;
}

export interface ThreadCommentWithAuthor extends Omit<ThreadComment, 'authorId'>, ThreadAuthor {}

export interface ThreadAttachmentWithImage extends ThreadAttachment {
  image: Image;
}

export interface ThreadCommentNode {
  comment: ThreadCommentWithAuthor;
  replies: ThreadCommentNode[];
}

export interface CommunityTopUser {
  user: Omit<User, 'emailVerified' | 'email'>;
  threadsCount: number;
  totalVotes: number;
}

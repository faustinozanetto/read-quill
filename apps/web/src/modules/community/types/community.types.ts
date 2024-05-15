import { Thread, ThreadComment, User } from '@read-quill/database';
import { voteThreadValidationSchema } from '../validations/community-thread.validations';
import { z } from 'zod';

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

export type VoteThreadValidationSchema = z.infer<typeof voteThreadValidationSchema>;

export interface CommunityTopUser {
  user: Omit<User, 'emailVerified' | 'email'>;
  threadsCount: number;
  totalVotes: number;
}

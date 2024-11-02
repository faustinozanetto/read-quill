import type { Book, User, Image } from '@read-quill/database';

export interface BookWithDetails extends Book {
  reader: User;
  image: Image;
  placeholderImage: BookPlaceholderImage;
}

export interface BookPlaceholderImage {
  blurUrl: string;
}

export interface BookReviewDetailsLikesEntry {
  id: string;
  isLike: boolean;
  user: {
    avatar: {
      path: string;
    } | null;
    id: string;
    name: string;
  };
  createdAt: Date;
}

import type { Book, User, Image } from '@read-quill/database';

export interface BookWithDetails extends Book {
  reader: User;
  image: Image;
  placeholderImage: BookPlaceholderImage;
}

export interface BookPlaceholderImage {
  blurUrl: string;
}

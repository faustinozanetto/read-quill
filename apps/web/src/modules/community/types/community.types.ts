import { Thread, User } from '@read-quill/database';

export interface ThreadWithAuthor extends Thread {
  author: {
    name: User['name'];
    image: User['image'];
  };
}

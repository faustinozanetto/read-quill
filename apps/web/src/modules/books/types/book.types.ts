import { Book, User } from '@read-quill/database';

export interface BookWithReader extends Book {
  reader: User | null;
}

import type { Book, User } from '@read-quill/database';
import type { z } from 'zod';
import type { createBookValidationSchemaForm } from '../validations/books.validations';

export interface BookWithReader extends Book {
  reader: User | null;
}

export type UserBooksManagementCreateFormData = z.infer<typeof createBookValidationSchemaForm>;

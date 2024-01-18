import { z } from 'zod';

export const createBookAnnotationValidationSchemaBase = z.object({
  title: z.string({ required_error: 'Title is required!' }),
  chapter: z.string({ required_error: 'Chapter is required!' }),
  content: z
    .string({ required_error: 'Content is required!' })
    .max(500, { message: 'Annotation max lenght is 500 characters!' }),
});

export const createBookAnnotationValidationSchemaAPI = createBookAnnotationValidationSchemaBase.extend({
  bookId: z.string(),
});

export const editBookAnnotationValidationSchemaBase = z.object({
  title: z.string().optional(),
  chapter: z.string().optional(),
  content: z.string().max(500, { message: 'Annotation max lenght is 500 characters!' }).optional(),
});

export const editBookAnnotationValidationSchemaAPI = editBookAnnotationValidationSchemaBase.extend({
  annotationId: z.string(),
});

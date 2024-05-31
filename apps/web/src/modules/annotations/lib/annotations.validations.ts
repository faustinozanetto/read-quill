import { BOOK_ATTRIBUTES_VALIDATIONS } from '@modules/books/validations/books.validations';
import { z } from 'zod';

/* Attributes Validations */
const annotationIdValidationSchema = z.string({ required_error: 'AnnotationId is required!' });
const annotationTitleValidationSchema = z.string({ required_error: 'Title is required!' });
const annotationChapterValidationSchema = z.string({ required_error: 'Chapter is required!' });
const annotationContentValidationSchema = z
  .string({ required_error: 'Content is required!' })
  .max(500, { message: 'Annotation max lenght is 500 characters!' });

type AnnotationAttributesValidations = {
  id: typeof annotationIdValidationSchema;
  title: typeof annotationTitleValidationSchema;
  chapter: typeof annotationChapterValidationSchema;
  content: typeof annotationContentValidationSchema;
};

export const ANNOATION_ATTRIBUTES_VALIDATIONS: AnnotationAttributesValidations = {
  id: annotationIdValidationSchema,
  title: annotationTitleValidationSchema,
  chapter: annotationChapterValidationSchema,
  content: annotationChapterValidationSchema,
};

/* Actions Validations */
const createBookAnnotationValidationSchemaBase = z.object({
  title: ANNOATION_ATTRIBUTES_VALIDATIONS.title,
  chapter: ANNOATION_ATTRIBUTES_VALIDATIONS.chapter,
  content: ANNOATION_ATTRIBUTES_VALIDATIONS.content,
});

const createBookAnnotationValidationSchemaApi = createBookAnnotationValidationSchemaBase.extend({
  bookId: BOOK_ATTRIBUTES_VALIDATIONS.id,
});

const editBookAnnotationValidationSchemaBase = z.object({
  title: ANNOATION_ATTRIBUTES_VALIDATIONS.title,
  chapter: ANNOATION_ATTRIBUTES_VALIDATIONS.chapter,
  content: ANNOATION_ATTRIBUTES_VALIDATIONS.content,
});

const editBookAnnotationValidationSchemaApi = editBookAnnotationValidationSchemaBase.extend({
  annotationId: ANNOATION_ATTRIBUTES_VALIDATIONS.id,
});

const deleteBookAnnotationValidationSchemaBase = z.object({
  annotationId: ANNOATION_ATTRIBUTES_VALIDATIONS.id,
});

export const ANNOTATION_ACTIONS_VALIDATIONS_API = {
  CREATE: createBookAnnotationValidationSchemaApi,
  DELETE: deleteBookAnnotationValidationSchemaBase,
  EDIT: editBookAnnotationValidationSchemaApi,
};

export const ANNOTATION_ACTIONS_VALIDATIONS_FORMS = {
  CREATE: createBookAnnotationValidationSchemaBase,
  DELETE: deleteBookAnnotationValidationSchemaBase,
  EDIT: editBookAnnotationValidationSchemaBase,
};

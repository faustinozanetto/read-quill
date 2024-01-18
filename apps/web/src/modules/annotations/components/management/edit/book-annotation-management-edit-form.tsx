import React from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, PencilIcon, cn, LoadingIcon } from '@read-quill/design-system';
import { editBookAnnotationValidationSchemaBase } from '@modules/annotations/lib/annotations.validations';
import AnnotationFormsTitle from '../../forms/annotation-forms-title';
import AnnotationFormsChapter from '../../forms/annotation-forms-chapter';
import AnnotationFormsContent from '../../forms/annotation-forms-content';
import { Annotation } from '@read-quill/database';

export type BookAnnotationManagementEditFormData = z.infer<typeof editBookAnnotationValidationSchemaBase>;

interface BookAnnotationManagementEditFormProps {
  annotation: Annotation;
  onSubmit: (data: BookAnnotationManagementEditFormData) => void;
}

const BookAnnotationManagementEditForm: React.FC<BookAnnotationManagementEditFormProps> = (props) => {
  const { annotation, onSubmit } = props;

  const form = useForm<BookAnnotationManagementEditFormData>({
    resolver: zodResolver(editBookAnnotationValidationSchemaBase),
    mode: 'onBlur',
    defaultValues: {
      ...annotation,
    },
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AnnotationFormsTitle />
        <AnnotationFormsChapter />
        <AnnotationFormsContent />

        <DialogFooter>
          <Button
            aria-label="Edit Annotation"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
            Edit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default BookAnnotationManagementEditForm;

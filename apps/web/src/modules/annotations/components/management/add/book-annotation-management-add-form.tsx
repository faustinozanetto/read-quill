import React from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, PencilIcon, cn, LoadingIcon } from '@read-quill/design-system';
import { createBookAnnotationValidationSchemaBase } from '@modules/annotations/lib/annotations.validations';
import AnnotationFormsTitle from '../../forms/annotation-forms-title';
import AnnotationFormsChapter from '../../forms/annotation-forms-chapter';
import AnnotationFormsContent from '../../forms/annotation-forms-content';

export type BookAnnotationManagementAddFormData = z.infer<typeof createBookAnnotationValidationSchemaBase>;

interface BookAnnotationManagementAddFormProps {
  onSubmit: (data: BookAnnotationManagementAddFormData) => void;
}

const BookAnnotationManagementAddForm: React.FC<BookAnnotationManagementAddFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm<BookAnnotationManagementAddFormData>({
    resolver: zodResolver(createBookAnnotationValidationSchemaBase),
    mode: 'onBlur',
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
            aria-label="Add Annotation"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default BookAnnotationManagementAddForm;

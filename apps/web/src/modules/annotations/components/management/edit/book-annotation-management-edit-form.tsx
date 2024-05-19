import React from 'react';
import type { z } from 'zod';
import { Button, PencilIcon, cn, LoadingIcon } from '@read-quill/design-system';
import type { Annotation } from '@read-quill/database';
import { editBookAnnotationValidationSchemaBase } from '@modules/annotations/lib/annotations.validations';
import AnnotationForm from '../../forms/annotation-form';

export type BookAnnotationManagementEditFormData = z.infer<typeof editBookAnnotationValidationSchemaBase>;

interface BookAnnotationManagementEditFormProps {
  annotation: Annotation;
  onSubmit: (data: BookAnnotationManagementEditFormData) => void;
}

const BookAnnotationManagementEditForm: React.FC<BookAnnotationManagementEditFormProps> = (props) => {
  const { annotation, onSubmit } = props;

  return (
    <AnnotationForm resolver={editBookAnnotationValidationSchemaBase} initialData={annotation} onSubmit={onSubmit}>
      {(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;
        return (
          <Button
            aria-label="Edit Annotation"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
            Edit
          </Button>
        );
      }}
    </AnnotationForm>
  );
};

export default BookAnnotationManagementEditForm;

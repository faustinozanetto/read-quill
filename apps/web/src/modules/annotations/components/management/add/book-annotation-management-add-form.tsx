import React from 'react';
import type { z } from 'zod';
import { Button, PencilIcon, cn, LoadingIcon } from '@read-quill/design-system';
import { createBookAnnotationValidationSchemaBase } from '@modules/annotations/lib/annotations.validations';
import AnnotationForm from '../../forms/annotation-form';

export type BookAnnotationManagementAddFormData = z.infer<typeof createBookAnnotationValidationSchemaBase>;

interface BookAnnotationManagementAddFormProps {
  onSubmit: (data: BookAnnotationManagementAddFormData) => void;
}

const BookAnnotationManagementAddForm: React.FC<BookAnnotationManagementAddFormProps> = (props) => {
  const { onSubmit } = props;

  return (
    <AnnotationForm resolver={createBookAnnotationValidationSchemaBase} onSubmit={onSubmit}>
      {(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;
        return (
          <Button
            aria-label="Create Annotation"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
            Create
          </Button>
        );
      }}
    </AnnotationForm>
  );
};

export default BookAnnotationManagementAddForm;

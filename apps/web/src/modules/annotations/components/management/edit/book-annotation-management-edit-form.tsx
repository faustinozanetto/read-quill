import React from 'react';

import { Button, PencilIcon, cn, LoadingIcon } from '@read-quill/design-system';
import type { Annotation } from '@read-quill/database';
import { editBookAnnotationValidationSchemaBase } from '@modules/annotations/lib/annotations.validations';
import AnnotationForm from '../../forms/annotation-form';
import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { EditAnnotationFormActionData } from '@modules/annotations/types/annotation-validations.types';

const STEPS_DATA: MultiStepFormStep<EditAnnotationFormActionData>[] = [
  {
    title: 'Title',
    fields: ['title'],
  },
  {
    title: 'Chapter',
    fields: ['chapter'],
  },
  {
    title: 'Content',
    fields: ['content'],
  },
];

interface BookAnnotationManagementEditFormProps {
  annotation: Annotation;
  onSubmit: (data: EditAnnotationFormActionData) => void;
}

const BookAnnotationManagementEditForm: React.FC<BookAnnotationManagementEditFormProps> = (props) => {
  const { annotation, onSubmit } = props;

  return (
    <AnnotationForm
      data={STEPS_DATA}
      resolver={editBookAnnotationValidationSchemaBase}
      initialData={annotation}
      onSubmit={onSubmit}
    >
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

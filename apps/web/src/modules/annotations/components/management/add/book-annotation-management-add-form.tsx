import React from 'react';

import { Button, PencilIcon, cn, LoadingIcon } from '@read-quill/design-system';

import AnnotationForm from '../../forms/annotation-form';
import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { CreateAnnotationFormActionData } from '@modules/annotations/types/annotation-validations.types';
import { ANNOTATION_ACTIONS_VALIDATIONS_FORMS } from '@modules/annotations/lib/annotations.validations';

const STEPS_DATA: MultiStepFormStep<CreateAnnotationFormActionData>[] = [
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

interface BookAnnotationManagementAddFormProps {
  onSubmit: (data: CreateAnnotationFormActionData) => void;
}

const BookAnnotationManagementAddForm: React.FC<BookAnnotationManagementAddFormProps> = (props) => {
  const { onSubmit } = props;

  return (
    <AnnotationForm data={STEPS_DATA} resolver={ANNOTATION_ACTIONS_VALIDATIONS_FORMS.CREATE} onSubmit={onSubmit}>
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

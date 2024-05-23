'use client';

import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { Button, LoadingIcon, PlusIcon, cn } from '@read-quill/design-system';
import React from 'react';
import ThreadFormsAttachments from '../forms/thread-forms-attachments';
import ThreadFormsContent from '../forms/thread-forms-content';
import ThreadFormsTitle from '../forms/thread-forms-title';
import ThreadFormsKeywords from '../forms/thread-forms-keywords';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';
import { CreateThreadFormActionData } from '@modules/community/types/community-thread-validations.types';
import { THREAD_ACTIONS_VALIDATIONS_FORMS } from '@modules/community/validations/community-thread.validations';

const STEPS_DATA: MultiStepFormStep<CreateThreadFormActionData>[] = [
  {
    title: 'Title',
    fields: ['title'],
  },
  {
    title: 'Keywords',
    fields: ['keywords'],
  },
  {
    title: 'Content',
    fields: ['content.content'],
  },
  { title: 'Attachments', fields: ['content.attachments'] },
];

interface CreateThreadFormProps {
  onSubmit: (data: CreateThreadFormActionData) => void;
}

const CreateThreadForm: React.FC<CreateThreadFormProps> = (props) => {
  const { onSubmit } = props;

  return (
    <MultiStepFormWrapper
      data={STEPS_DATA}
      resolver={THREAD_ACTIONS_VALIDATIONS_FORMS.CREATE}
      onSubmit={onSubmit}
      renderSubmitButton={(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;

        return (
          <Button
            aria-label="Post Thread"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
            Post
          </Button>
        );
      }}
    >
      {(currentStep) => (
        <>
          {currentStep === 0 && <ThreadFormsTitle />}
          {currentStep === 1 && <ThreadFormsKeywords />}
          {currentStep === 2 && <ThreadFormsContent name="content.content" />}
          {currentStep === 3 && <ThreadFormsAttachments />}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default CreateThreadForm;

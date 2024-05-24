'use client';

import { ThreadWithDetails } from '@modules/community/types/community.types';

import { Button, LoadingIcon, PencilIcon, cn } from '@read-quill/design-system';
import React from 'react';

import ThreadFormsTitle from '../../../forms/thread-forms-title';
import ThreadFormsKeywords from '../../../forms/thread-forms-keywords';
import ThreadFormsContent from '../../../forms/thread-forms-content';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';
import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { EditThreadFormActionData } from '@modules/community/types/community-thread-validations.types';
import { THREAD_ACTIONS_VALIDATIONS_FORMS } from '@modules/community/validations/community-thread.validations';
import { zodResolver } from '@hookform/resolvers/zod';

const STEPS_DATA: MultiStepFormStep<EditThreadFormActionData>[] = [
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
    fields: ['content'],
  },
];

interface CommunityThreadManagementEditFormProps {
  thread: ThreadWithDetails;
  onSubmit: (data: EditThreadFormActionData) => void;
}

const CommunityThreadManagementEditForm: React.FC<CommunityThreadManagementEditFormProps> = (props) => {
  const { thread, onSubmit } = props;

  return (
    <MultiStepFormWrapper
      data={STEPS_DATA}
      defaultValues={{
        title: thread.title,
        content: thread.content,
        keywords: thread.keywords.split(','),
      }}
      resolver={zodResolver(THREAD_ACTIONS_VALIDATIONS_FORMS.EDIT)}
      onSubmit={onSubmit}
      renderSubmitButton={(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;

        return (
          <Button
            aria-label="Edit Thread"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
            Edit
          </Button>
        );
      }}
    >
      {(currentStep) => (
        <>
          {currentStep === 0 && <ThreadFormsTitle />}
          {currentStep === 1 && <ThreadFormsKeywords />}
          {currentStep === 2 && <ThreadFormsContent name="content" />}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default CommunityThreadManagementEditForm;

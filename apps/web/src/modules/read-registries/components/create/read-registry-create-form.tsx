import React from 'react';

import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';

import { Button, LoadingIcon, PlusIcon, cn } from '@read-quill/design-system';
import { useBooksNames } from '@modules/dashboard/hooks/use-books-names';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateReadRegistryFormActionData } from '@modules/read-registries/types/read-registries-validations.types';
import { READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS } from '@modules/read-registries/lib/read-registries.validations';
import ReadRegistryFormPagesRead from '../forms/read-registry-form-pages-read';
import ReadRegistryFormBook from '../forms/read-registry-form-book';

const STEPS_DATA: MultiStepFormStep<CreateReadRegistryFormActionData>[] = [
  {
    title: 'Pages Read',
    fields: ['pagesRead'],
  },
  {
    title: 'Book',
    fields: ['bookId'],
  },
];

interface ReadRegistryCreateFormProps {
  onSubmit: (data: CreateReadRegistryFormActionData) => void;
}

const ReadRegistryCreateForm: React.FC<ReadRegistryCreateFormProps> = (props) => {
  const { onSubmit } = props;

  const { data } = useBooksNames();

  return (
    <MultiStepFormWrapper
      data={STEPS_DATA}
      resolver={zodResolver(READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS.CREATE)}
      onSubmit={onSubmit}
      renderSubmitButton={(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;

        return (
          <Button
            aria-label="Edit Read Targets"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
            Create
          </Button>
        );
      }}
    >
      {(form, currentStep) => (
        <>
          {currentStep === 0 && <ReadRegistryFormPagesRead />}
          {currentStep === 1 && <ReadRegistryFormBook booksNames={data.booksNames} />}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default ReadRegistryCreateForm;

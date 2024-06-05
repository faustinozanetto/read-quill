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

const STEPS_DATA_NO_BOOK: MultiStepFormStep<CreateReadRegistryFormActionData>[] = [
  {
    title: 'Pages Read',
    fields: ['pagesRead'],
  },
];

const STEPS_DATA_BOOK: MultiStepFormStep<CreateReadRegistryFormActionData>[] = [
  ...STEPS_DATA_NO_BOOK,
  {
    title: 'Book',
    fields: ['bookId'],
  },
];

interface ReadRegistryCreateFormProps {
  bookId?: string;
  onSubmit: (data: CreateReadRegistryFormActionData) => void;
}

const ReadRegistryCreateForm: React.FC<ReadRegistryCreateFormProps> = (props) => {
  const { onSubmit, bookId } = props;

  const { data } = useBooksNames();

  return (
    <MultiStepFormWrapper
      data={bookId ? STEPS_DATA_NO_BOOK : STEPS_DATA_BOOK}
      resolver={zodResolver(READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS.CREATE)}
      defaultValues={{ bookId }}
      onSubmit={onSubmit}
      renderSubmitButton={(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;

        return (
          <Button
            aria-label="Create Read Registry"
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
          {!bookId && currentStep === 1 && <ReadRegistryFormBook booksNames={data?.data?.booksNames ?? []} />}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default ReadRegistryCreateForm;

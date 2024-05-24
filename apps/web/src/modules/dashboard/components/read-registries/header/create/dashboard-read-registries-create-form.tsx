import React from 'react';
import type { z } from 'zod';

import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';

import { createReadRegistryValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import { Button, LoadingIcon, PlusIcon, cn } from '@read-quill/design-system';
import DashboardReadRegistriesFormPagesRead from '@modules/dashboard/components/forms/read-registries/dashboard-read-registries-page-count';
import DashboardReadRegistriesFormBook from '@modules/dashboard/components/forms/read-registries/dashboard-read-registries-book';
import { useBooksNames } from '@modules/dashboard/hooks/use-books-names';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';

export type DashboardReadRegistriesCreateFormData = z.infer<typeof createReadRegistryValidationSchema>;

const STEPS_DATA: MultiStepFormStep<DashboardReadRegistriesCreateFormData>[] = [
  {
    title: 'Pages Read',
    fields: ['pagesRead'],
  },
  {
    title: 'Book',
    fields: ['bookId'],
  },
];

interface DashboardReadRegistriesCreateFormProps {
  onSubmit: (data: DashboardReadRegistriesCreateFormData) => void;
}

const DashboardReadRegistriesCreateForm: React.FC<DashboardReadRegistriesCreateFormProps> = (props) => {
  const { onSubmit } = props;

  const { data } = useBooksNames();

  return (
    <MultiStepFormWrapper
      data={STEPS_DATA}
      resolver={zodResolver(createReadRegistryValidationSchema)}
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
      {(currentStep) => (
        <>
          {currentStep === 0 && <DashboardReadRegistriesFormPagesRead />}
          {currentStep === 1 && <DashboardReadRegistriesFormBook booksNames={data.booksNames} />}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default DashboardReadRegistriesCreateForm;

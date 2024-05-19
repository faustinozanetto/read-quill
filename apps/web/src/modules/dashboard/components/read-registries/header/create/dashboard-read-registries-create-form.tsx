import React from 'react';
import type { z } from 'zod';

import { MultiStepFormStep, useMultiStepForm } from '@modules/forms/hooks/use-multi-step-form';

import { createReadRegistryValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import {
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  DialogFooter,
  Form,
  LoadingIcon,
  PlusIcon,
  cn,
} from '@read-quill/design-system';
import DashboardReadRegistriesFormPagesRead from '@modules/dashboard/components/forms/read-registries/dashboard-read-registries-page-count';
import DashboardReadRegistriesFormBook from '@modules/dashboard/components/forms/read-registries/dashboard-read-registries-book';
import { useBooksNames } from '@modules/dashboard/hooks/use-books-names';

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

  const {
    form,
    currentStep,
    totalSteps,
    getCanGoNextStep,
    getCanGoPrevStep,
    getCanSubmit,
    gotoNextStep,
    gotoPrevStep,
  } = useMultiStepForm<DashboardReadRegistriesCreateFormData>({
    data: STEPS_DATA,
    resolver: createReadRegistryValidationSchema,
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{STEPS_DATA[currentStep].title}</h4>
        <span>
          Step <strong>{currentStep + 1}</strong> of <strong>{totalSteps}</strong>
        </span>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep === 0 && <DashboardReadRegistriesFormPagesRead />}
          {currentStep === 1 && (
            <>
              <DashboardReadRegistriesFormBook booksNames={data.booksNames} />
            </>
          )}

          <DialogFooter>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:ml-auto">
              <Button disabled={!getCanGoPrevStep()} variant="outline" onClick={gotoPrevStep}>
                <ChevronLeftIcon className="mr-2" />
                Prev
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  disabled={!getCanGoNextStep()}
                  variant="outline"
                  onClick={async () => await gotoNextStep()}
                  type="button"
                >
                  Next
                  <ChevronRightIcon className="ml-2" />
                </Button>
              )}
              {currentStep === totalSteps - 1 && (
                <Button
                  aria-label="Edit Read Targets"
                  className={cn(isFormLoading && 'cursor-not-allowed')}
                  disabled={isFormLoading || !getCanSubmit()}
                  type="submit"
                >
                  {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
                  Create
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default DashboardReadRegistriesCreateForm;

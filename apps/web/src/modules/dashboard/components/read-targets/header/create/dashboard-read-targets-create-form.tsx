import React from 'react';
import type { z } from 'zod';
import {
  Button,
  DialogFooter,
  Form,
  PlusIcon,
  cn,
  LoadingIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@read-quill/design-system';
import { createReadTargetsValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import DashboardReadTargetsFormDaily from '../../../forms/read-targets/dashboard-read-targets-form-daily';
import DashboardReadTargetsFormWeekly from '../../../forms/read-targets/dashboard-read-targets-form-weekly';
import DashboardReadTargetsFormMonthly from '../../../forms/read-targets/dashboard-read-targets-form-monthly';
import { MultiStepFormStep, useMultiStepForm } from '@modules/forms/hooks/use-multi-step-form';

const STEPS_DATA: MultiStepFormStep<DashboardReadTargetsCreateFormData>[] = [
  {
    title: 'Daily Target',
    fields: ['daily'],
  },
  {
    title: 'Weekly Target',
    fields: ['weekly'],
  },
  {
    title: 'Monthly Target',
    fields: ['monthly'],
  },
];

export type DashboardReadTargetsCreateFormData = z.infer<typeof createReadTargetsValidationSchema>;

interface DashboardReadTargetsCreateFormProps {
  onSubmit: (data: DashboardReadTargetsCreateFormData) => void;
}

const DashboardReadTargetsCreateForm: React.FC<DashboardReadTargetsCreateFormProps> = (props) => {
  const { onSubmit } = props;

  const {
    form,
    currentStep,
    totalSteps,
    getCanGoNextStep,
    getCanGoPrevStep,
    getCanSubmit,
    gotoNextStep,
    gotoPrevStep,
  } = useMultiStepForm<DashboardReadTargetsCreateFormData>({
    data: STEPS_DATA,
    resolver: createReadTargetsValidationSchema,
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{STEPS_DATA[currentStep].title}</h4>
        <span>
          Step <strong>{currentStep + 1}</strong> of <strong>{totalSteps}</strong>
        </span>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep === 0 && <DashboardReadTargetsFormDaily />}
          {currentStep === 1 && <DashboardReadTargetsFormWeekly />}
          {currentStep === 2 && <DashboardReadTargetsFormMonthly />}

          <DialogFooter className="col-span-2">
            <div className="mt-4 grid grid-cols-2 gap-2 sm:ml-auto">
              <Button disabled={!getCanGoPrevStep()} variant="outline" onClick={gotoPrevStep}>
                <ChevronLeftIcon className="mr-2" />
                Prev
              </Button>
              {currentStep < totalSteps - 1 ? (
                <Button disabled={!getCanGoNextStep()} variant="outline" onClick={gotoNextStep}>
                  Next
                  <ChevronRightIcon className="ml-2" />
                </Button>
              ) : (
                <Button
                  aria-label="Create Read Targets"
                  className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
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

export default DashboardReadTargetsCreateForm;

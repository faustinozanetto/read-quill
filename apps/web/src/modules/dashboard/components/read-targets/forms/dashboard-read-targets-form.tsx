import React, { useEffect } from 'react';
import type { ZodSchema } from 'zod';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import { Button, ChevronLeftIcon, ChevronRightIcon, DialogFooter, Form } from '@read-quill/design-system';
import DashboardReadTargetsFormDaily from './dashboard-read-targets-form-daily';
import DashboardReadTargetsFormWeekly from './dashboard-read-targets-form-weekly';
import DashboardReadTargetsFormMonthly from './dashboard-read-targets-form-monthly';
import { MultiStepFormStep, useMultiStepForm } from '@modules/forms/hooks/use-multi-step-form';
import { DashboardReadTargetsCreateFormData } from '../header/create/dashboard-read-targets-create-form';

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

interface DashboardReadTargetsFormProps<T extends FieldValues> {
  resolver: ZodSchema<T>;
  initialData?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const DashboardReadTargetsForm = <T extends FieldValues>(props: DashboardReadTargetsFormProps<T>) => {
  const { resolver, initialData, onSubmit, children } = props;

  const {
    form,
    currentStep,
    totalSteps,
    getCanGoNextStep,
    getCanGoPrevStep,
    getCanSubmit,
    gotoNextStep,
    gotoPrevStep,
  } = useMultiStepForm<T>({
    data: STEPS_DATA,
    initialData,
    resolver,
  });

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
          {currentStep === 0 && <DashboardReadTargetsFormDaily />}
          {currentStep === 1 && <DashboardReadTargetsFormWeekly />}
          {currentStep === 2 && <DashboardReadTargetsFormMonthly />}

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
              {currentStep === totalSteps - 1 && children(form, getCanSubmit)}
            </div>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default DashboardReadTargetsForm;

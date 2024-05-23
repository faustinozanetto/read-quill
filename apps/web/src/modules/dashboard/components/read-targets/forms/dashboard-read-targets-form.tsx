import React from 'react';
import type { ZodSchema } from 'zod';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import DashboardReadTargetsFormDaily from './dashboard-read-targets-form-daily';
import DashboardReadTargetsFormWeekly from './dashboard-read-targets-form-weekly';
import DashboardReadTargetsFormMonthly from './dashboard-read-targets-form-monthly';
import { UseMultiStepFormParams } from '@modules/forms/hooks/use-multi-step-form';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';

interface DashboardReadTargetsFormProps<T extends FieldValues> {
  resolver: ZodSchema<T>;
  data: UseMultiStepFormParams<T>['data'];
  initialData?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const DashboardReadTargetsForm = <T extends FieldValues>(props: DashboardReadTargetsFormProps<T>) => {
  const { resolver, data, initialData, onSubmit, children } = props;

  return (
    <MultiStepFormWrapper
      data={data}
      initialData={initialData}
      resolver={resolver}
      onSubmit={onSubmit}
      renderSubmitButton={(form, getCanSubmit) => {
        return children(form, getCanSubmit);
      }}
    >
      {(currentStep) => (
        <>
          {currentStep === 0 && <DashboardReadTargetsFormDaily />}
          {currentStep === 1 && <DashboardReadTargetsFormWeekly />}
          {currentStep === 2 && <DashboardReadTargetsFormMonthly />}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default DashboardReadTargetsForm;

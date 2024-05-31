import React from 'react';
import type { ZodSchema } from 'zod';
import { DefaultValues, FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import DashboardReadTargetsFormDaily from './dashboard-read-targets-form-daily';
import DashboardReadTargetsFormWeekly from './dashboard-read-targets-form-weekly';
import DashboardReadTargetsFormMonthly from './dashboard-read-targets-form-monthly';
import { UseMultiStepFormParams } from '@modules/forms/hooks/use-multi-step-form';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';

interface DashboardReadTargetsFormProps<T extends FieldValues> extends UseFormProps<T> {
  data: UseMultiStepFormParams<T>['data'];
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const DashboardReadTargetsForm = <T extends FieldValues>(props: DashboardReadTargetsFormProps<T>) => {
  const { data, onSubmit, children, ...formProps } = props;

  return (
    <MultiStepFormWrapper
      data={data}
      onSubmit={onSubmit}
      renderSubmitButton={(form, getCanSubmit) => {
        return children(form, getCanSubmit);
      }}
      {...formProps}
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

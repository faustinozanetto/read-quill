import React from 'react';
import type { ZodSchema } from 'zod';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import { UseMultiStepFormParams } from '@modules/forms/hooks/use-multi-step-form';
import AnnotationFormsTitle from './annotation-forms-title';
import AnnotationFormsContent from './annotation-forms-content';
import AnnotationFormsChapter from './annotation-forms-chapter';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';

interface AnnotationFormProps<T extends FieldValues> {
  resolver: ZodSchema<T>;
  data: UseMultiStepFormParams<T>['data'];
  initialData?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const AnnotationForm = <T extends FieldValues>(props: AnnotationFormProps<T>) => {
  const { resolver, data, initialData, onSubmit, children } = props;

  return (
    <MultiStepFormWrapper
      data={data}
      resolver={resolver}
      onSubmit={onSubmit}
      initialData={initialData}
      renderSubmitButton={(form, getCanSubmit) => {
        return children(form, getCanSubmit);
      }}
    >
      {(currentStep) => (
        <>
          {currentStep === 0 && <AnnotationFormsTitle />}
          {currentStep === 1 && <AnnotationFormsChapter />}
          {currentStep === 2 && <AnnotationFormsContent />}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default AnnotationForm;

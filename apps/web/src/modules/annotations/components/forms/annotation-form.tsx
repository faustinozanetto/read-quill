import React from 'react';

import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { UseMultiStepFormParams } from '@modules/forms/hooks/use-multi-step-form';
import AnnotationFormsTitle from './annotation-forms-title';
import AnnotationFormsContent from './annotation-forms-content';
import AnnotationFormsChapter from './annotation-forms-chapter';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';

interface AnnotationFormProps<T extends FieldValues> extends UseFormProps<T> {
  data: UseMultiStepFormParams<T>['data'];
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const AnnotationForm = <T extends FieldValues>(props: AnnotationFormProps<T>) => {
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
          {currentStep === 0 && <AnnotationFormsTitle />}
          {currentStep === 1 && <AnnotationFormsChapter />}
          {currentStep === 2 && <AnnotationFormsContent />}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default AnnotationForm;

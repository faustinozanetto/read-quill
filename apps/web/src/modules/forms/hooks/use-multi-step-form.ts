import { useState } from 'react';
import { DeepPartial, FieldValues, UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface MultiStepFormStep<T extends FieldValues> {
  title: string;
  fields: (keyof T)[];
}

interface UseMultiStepFormParams<T extends FieldValues> {
  data: MultiStepFormStep<T>[];
  resolver: any;
  initialData?: DeepPartial<T>;
}

export interface UseMultiStepFormReturn<T extends FieldValues> {
  form: UseFormReturn<T>;
  currentStep: number;
  totalSteps: number;
  gotoNextStep: () => void;
  gotoPrevStep: () => void;
  getCanGoPrevStep: () => boolean;
  getCanGoNextStep: () => boolean;
  getCanSubmit: () => boolean;
}

/**
 * Custom hook used in the credits payment to represent a multi-step form.
 * @param params Hook params.
 * @returns Hook return.
 */
export const useMultiStepForm = <T extends FieldValues>(
  params: UseMultiStepFormParams<T>
): UseMultiStepFormReturn<T> => {
  const { data, resolver, initialData } = params;

  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<T>({
    resolver: zodResolver(resolver),
    defaultValues: { ...initialData },
  });

  const gotoNextStep = async () => {
    const fields = data[currentStep].fields;
    const output = await form.trigger(fields, {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < data.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const gotoPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const getCanGoNextStep = () => {
    return currentStep < data.length - 1;
  };

  const getCanGoPrevStep = () => {
    return currentStep > 0;
  };

  const getCanSubmit = () => {
    return form.formState.isValid && currentStep === data.length - 1;
  };

  return {
    form,
    currentStep,
    totalSteps: data.length,
    gotoNextStep,
    gotoPrevStep,
    getCanGoNextStep,
    getCanGoPrevStep,
    getCanSubmit,
  };
};

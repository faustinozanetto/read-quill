import { useEffect, useMemo, useState } from 'react';
import { DefaultValues, FieldValues, Path, UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

export interface MultiStepFormStep<T extends FieldValues> {
  title: string;
  fields: Path<T>[];
}

export interface UseMultiStepFormParams<T extends FieldValues> {
  data: MultiStepFormStep<T>[];
  resolver: ZodSchema<T>;
  initialData?: DefaultValues<T>;
}

export interface UseMultiStepFormReturn<T extends FieldValues> {
  form: UseFormReturn<T>;
  currentStep: number;
  totalSteps: number;
  gotoNextStep: () => Promise<void>;
  gotoPrevStep: () => void;
  getCanGoPrevStep: () => boolean;
  getCanGoNextStep: () => boolean;
  getCanSubmit: () => boolean;
  resetForm: () => void;
  getProgress: () => number;
}

export const useMultiStepForm = <T extends FieldValues>(
  params: UseMultiStepFormParams<T>
): UseMultiStepFormReturn<T> => {
  const { data, resolver, initialData } = params;

  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<T>({
    resolver: zodResolver(resolver),
    defaultValues: initialData,
  });

  // Prevent form submission on Enter key press unless on the last step
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === 'Enter' && currentStep < totalSteps - 1) {
        event.preventDefault();
        await gotoNextStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep, data.length]);

  const gotoNextStep = async () => {
    const fields = data[currentStep].fields;
    const isValid = await form.trigger(fields, { shouldFocus: true });

    if (isValid && currentStep < data.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const gotoPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const resetForm = () => {
    form.reset(initialData);
    setCurrentStep(0);
  };

  const getCanGoPrevStep = () => currentStep > 0;
  const getCanGoNextStep = () => currentStep < data.length - 1;
  const getCanSubmit = () => form.formState.isValid && currentStep === data.length - 1;
  const getProgress = () => ((currentStep + 1) / data.length) * 100;

  const totalSteps = data.length;

  return {
    form,
    currentStep,
    totalSteps,
    gotoNextStep,
    gotoPrevStep,
    getCanGoPrevStep,
    getCanGoNextStep,
    getCanSubmit,
    getProgress,
    resetForm,
  };
};

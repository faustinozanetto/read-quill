import { useEffect, useState } from 'react';
import { DefaultValues, FieldValues, Path, UseFormProps, UseFormReturn, useForm } from 'react-hook-form';

/**
 * Interface representing a step in the multi-step form.
 * @template T - The type of field values.
 */
export interface MultiStepFormStep<T extends FieldValues> {
  /**
   * The title of the step.
   */
  title: string;
  /**
   * The fields included in this step.
   */
  fields: Path<T>[];
}

/**
 * Parameters for the useMultiStepForm hook.
 * @template T - The type of field values.
 */
export interface UseMultiStepFormParams<T extends FieldValues> extends UseFormProps<T> {
  /**
   * The data representing the steps of the form.
   */
  data: MultiStepFormStep<T>[];
}

/**
 * Return type for the useMultiStepForm hook.
 * @template T - The type of field values.
 */
export interface UseMultiStepFormReturn<T extends FieldValues> {
  /**
   * The form object returned by react-hook-form's useForm.
   */
  form: UseFormReturn<T>;
  /**
   * The current step index (zero-based).
   */
  currentStep: number;
  /**
   * The total number of steps in the form.
   */
  totalSteps: number;
  /**
   * Function to go to the next step.
   */
  gotoNextStep: () => Promise<void>;
  /**
   * Function to go to the previous step.
   */
  gotoPrevStep: () => void;
  /**
   * Function to check if it is possible to go to the previous step.
   * @returns true if it is possible to go to the previous step, otherwise false.
   */
  getCanGoPrevStep: () => boolean;
  /**
   * Function to check if it is possible to go to the next step.
   * @returns true if it is possible to go to the next step, otherwise false.
   */
  getCanGoNextStep: () => boolean;
  /**
   * Function to check if the form can be submitted.
   * @returns true if the form is valid and on the last step, otherwise false.
   */
  getCanSubmit: () => boolean;
  /**
   * Function to reset the form and go to the first step.
   */
  resetForm: () => void;
  /**
   * Function to get the progress of the form completion as a percentage.
   * @returns The progress percentage.
   */
  getProgress: () => number;
}

/**
 * A custom hook for handling multi-step forms.
 * @template T - The type of field values.
 * @param params - The parameters for configuring the multi-step form.
 * @returns An object containing form state and navigation functions.
 */
export const useMultiStepForm = <T extends FieldValues>(
  params: UseMultiStepFormParams<T>
): UseMultiStepFormReturn<T> => {
  const { data, ...formProps } = params;

  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<T>({
    ...formProps,
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
    if (formProps.defaultValues) form.reset(formProps.defaultValues as DefaultValues<T>);
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

import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { UseMultiStepFormParams, useMultiStepForm } from '../hooks/use-multi-step-form';
import { ChevronLeftIcon, Button, Form, ChevronRightIcon } from '@read-quill/design-system';

/**
 * Props for the MultiStepFormWrapper component.
 * @template T - The type of field values.
 */
export interface MultiStepFormWrapperProps<T extends FieldValues> extends UseMultiStepFormParams<T> {
  /**
   * A function that renders the content of each step based on the current step index.
   * @param currentStep - The current step index.
   * @returns The React node representing the content of the current step.
   */
  children: (currentStep: number) => React.ReactNode;
  /**
   * A function that handles form submission.
   * @param data - The form data submitted upon completion.
   */
  onSubmit: (data: T) => void;
  /**
   * A function that renders the submit button.
   * @param form - The useFormReturn object returned by react-hook-form.
   * @param getCanSubmit - A function to check if the form can be submitted.
   * @returns The React node representing the submit button.
   */
  renderSubmitButton: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

/**
 * A wrapper component for managing multi-step forms.
 * @template T - The type of field values.
 * @param props - The props for configuring the multi-step form.
 */
const MultiStepFormWrapper = <T extends FieldValues>(props: MultiStepFormWrapperProps<T>) => {
  const { renderSubmitButton, onSubmit, children, ...formProps } = props;

  const {
    form,
    currentStep,
    totalSteps,
    getCanGoNextStep,
    getCanGoPrevStep,
    getCanSubmit,
    getProgress,
    gotoNextStep,
    gotoPrevStep,
    resetForm,
  } = useMultiStepForm(formProps);

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{formProps.data[currentStep].title}</h4>
        <span>
          Step <strong>{currentStep + 1}</strong> of <strong>{totalSteps}</strong>
        </span>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          {children(currentStep)}
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
            {currentStep === totalSteps - 1 && renderSubmitButton(form, getCanSubmit)}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MultiStepFormWrapper;

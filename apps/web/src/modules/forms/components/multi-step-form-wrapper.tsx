import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { UseMultiStepFormParams, useMultiStepForm } from '../hooks/use-multi-step-form';
import { ChevronLeftIcon, Button, Form, ChevronRightIcon } from '@read-quill/design-system';

interface MultiStepFormWrapperProps<T extends FieldValues> extends UseMultiStepFormParams<T> {
  children: (currentStep: number) => React.ReactNode;
  onSubmit: (data: T) => void;
  renderSubmitButton: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const MultiStepFormWrapper = <T extends FieldValues>(props: MultiStepFormWrapperProps<T>) => {
  const { data, resolver, initialData, children, renderSubmitButton, onSubmit } = props;

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
  } = useMultiStepForm({ data, resolver, initialData });

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{data[currentStep].title}</h4>
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

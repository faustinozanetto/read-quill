import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { UseMultiStepFormParams, useMultiStepForm } from '../hooks/use-multi-step-form';
import {
  ChevronLeftIcon,
  Button,
  Form,
  ChevronRightIcon,
  NumberOneIcon,
  NumberFiveIcon,
  NumberFourIcon,
  NumberSixIcon,
  NumberThreeIcon,
  NumberTwoIcon,
  cn,
  Label,
  Separator,
} from '@read-quill/design-system';
import { BaseIconProps } from '@read-quill/design-system/src/components/icons/base-icon';

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
  children: (form: UseFormReturn<T>, currentStep: number) => React.ReactNode;
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

const FORM_STEP_ICONS: Record<number, React.FC<BaseIconProps>> = {
  1: NumberOneIcon,
  2: NumberTwoIcon,
  3: NumberThreeIcon,
  4: NumberFourIcon,
  5: NumberFiveIcon,
  6: NumberSixIcon,
};

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
        <ol
          className="grid justify-center items-center w-full"
          style={{
            gridTemplateColumns: `repeat(${totalSteps}, 1fr)`,
          }}
        >
          {Array.from({ length: totalSteps }).map((step, index) => {
            const shouldRenderConnectingLine = index >= 0 && index < totalSteps - 1;
            const isFirstStep = index === 0;
            const isLastStep = index === totalSteps - 1;
            const isStepCompleted = index <= currentStep;
            return (
              <li
                key={`multi-form-${index}`}
                className={cn(
                  'flex justify-center items-center flex-col gap-1 text-center mb-auto',
                  shouldRenderConnectingLine && 'flex-1'
                )}
              >
                <div className="relative flex items-center justify-center w-full">
                  <div
                    className={cn(
                      'h-[2px] bg-primary absolute top-1/2 left-0 right-0',
                      isFirstStep && 'left-1/2',
                      isLastStep && 'right-1/2'
                    )}
                  />
                  <div
                    className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center z-10 relative',
                      isStepCompleted ? 'bg-primary' : 'bg-background border-primary border-2'
                    )}
                  >
                    {React.createElement(FORM_STEP_ICONS[index + 1], {
                      className: cn('h-8 w-8', isStepCompleted ? 'stroke-primary-foreground' : 'stroke-primary'),
                    })}
                  </div>
                </div>
                <Label htmlFor={`multi-step-${index}-title`} className="text-xs text-wrap">
                  {formProps.data[index].title}
                </Label>
              </li>
            );
          })}
        </ol>
      </div>
      <Separator />
      <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          {children(form, currentStep)}
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

import React from 'react';
import type { ZodSchema } from 'zod';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import { Button, ChevronLeftIcon, ChevronRightIcon, DialogFooter, Form } from '@read-quill/design-system';
import BookFormsName from './book-forms-name';
import BookFormsAuthor from './book-forms-author';
import { MultiStepFormStep, useMultiStepForm } from '@modules/forms/hooks/use-multi-step-form';
import { UserBooksManagementCreateFormData } from '../detailed/management/create/user-books-management-create-form';
import BookFormsCoverImage from './book-forms-cover-image';
import BookFormsLanguage from './book-forms-language';
import BookFormsPageCount from './book-forms-page-count';
import BookFormsStartedAt from './book-forms-started-at';
import BookFormsFinishedAt from './book-forms-finished-at';
import { BookAnnotationManagementAddFormData } from '../management/add/book-annotation-management-add-form';
import AnnotationFormsTitle from './annotation-forms-title';
import AnnotationFormsContent from './annotation-forms-content';
import AnnotationFormsChapter from './annotation-forms-chapter';

const STEPS_DATA: MultiStepFormStep<BookAnnotationManagementAddFormData>[] = [
  {
    title: 'Title',
    fields: ['title'],
  },
  {
    title: 'Chapter',
    fields: ['chapter'],
  },
  {
    title: 'Content',
    fields: ['content'],
  },
];

interface AnnotationFormProps<T extends FieldValues> {
  resolver: ZodSchema<T>;
  initialData?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const AnnotationForm = <T extends FieldValues>(props: AnnotationFormProps<T>) => {
  const { resolver, initialData, onSubmit, children } = props;

  const {
    form,
    currentStep,
    totalSteps,
    getCanGoNextStep,
    getCanGoPrevStep,
    getCanSubmit,
    gotoNextStep,
    gotoPrevStep,
  } = useMultiStepForm<T>({
    data: STEPS_DATA,
    initialData,
    resolver,
  });

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{STEPS_DATA[currentStep].title}</h4>
        <span>
          Step <strong>{currentStep + 1}</strong> of <strong>{totalSteps}</strong>
        </span>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep === 0 && <AnnotationFormsTitle />}
          {currentStep === 1 && <AnnotationFormsChapter />}
          {currentStep === 2 && <AnnotationFormsContent />}

          <DialogFooter>
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
              {currentStep === totalSteps - 1 && children(form, getCanSubmit)}
            </div>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default AnnotationForm;

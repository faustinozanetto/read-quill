import React from 'react';
import type { ZodSchema } from 'zod';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import BookFormsName from './book-forms-name';
import BookFormsAuthor from './book-forms-author';
import { UseMultiStepFormParams } from '@modules/forms/hooks/use-multi-step-form';
import BookFormsCoverImage from './book-forms-cover-image';
import BookFormsLanguage from './book-forms-language';
import BookFormsPageCount from './book-forms-page-count';
import BookFormsStartedAt from './book-forms-started-at';
import BookFormsFinishedAt from './book-forms-finished-at';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';

interface BookFormProps<T extends FieldValues> {
  resolver: ZodSchema<T>;
  data: UseMultiStepFormParams<T>['data'];
  initialData?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const BookForm = <T extends FieldValues>(props: BookFormProps<T>) => {
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
          {currentStep === 0 && (
            <>
              <BookFormsName />
              <BookFormsAuthor />
            </>
          )}
          {currentStep === 1 && (
            <>
              <BookFormsCoverImage />
            </>
          )}
          {currentStep === 2 && (
            <>
              <BookFormsLanguage />
              <BookFormsPageCount />
            </>
          )}
          {currentStep === 3 && (
            <>
              <BookFormsStartedAt />
              <BookFormsFinishedAt />
            </>
          )}
        </>
      )}
    </MultiStepFormWrapper>
  );
};

export default BookForm;

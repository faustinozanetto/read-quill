import React from 'react';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import BookFormsName from './book-forms-name';
import BookFormsAuthor from './book-forms-author';
import { UseMultiStepFormParams } from '@modules/forms/hooks/use-multi-step-form';
import BookFormsCoverImage from './book-forms-cover-image';
import BookFormsLanguage from './book-forms-language';
import BookFormsPageCount from './book-forms-page-count';
import BookFormsStartedAt from './book-forms-started-at';
import BookFormsFinishedAt from './book-forms-finished-at';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';

interface BookFormProps<T extends FieldValues> extends UseFormProps<T> {
  data: UseMultiStepFormParams<T>['data'];
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>, getCanSubmit: () => boolean) => React.ReactNode;
}

const BookForm = <T extends FieldValues>(props: BookFormProps<T>) => {
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

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, PencilIcon, cn, LoadingIcon } from '@read-quill/design-system';

import { REVIEW_ACTIONS_VALIDATIONS_FORMS } from '@modules/review/validations/reviews.validations';
import { CreateReviewFormActionData } from '@modules/review/types/review-validations.types';
import ReviewFormContent from '../forms/review-form-content';

interface ReviewCreateFormProps {
  onSubmit: (data: CreateReviewFormActionData) => void;
}

const ReviewCreateForm: React.FC<ReviewCreateFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm<CreateReviewFormActionData>({
    resolver: zodResolver(REVIEW_ACTIONS_VALIDATIONS_FORMS.CREATE),
    mode: 'onBlur',
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <ReviewFormContent />
        <DialogFooter>
          <Button
            aria-label="Add Review"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PencilIcon className="mr-2" />}
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ReviewCreateForm;

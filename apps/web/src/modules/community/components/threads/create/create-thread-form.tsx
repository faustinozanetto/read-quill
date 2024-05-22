'use client';

import { createThreadValidationBaseSchema } from '@modules/community/validations/community-thread.validations';
import { MultiStepFormStep, useMultiStepForm } from '@modules/forms/hooks/use-multi-step-form';
import {
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  LoadingIcon,
  PlusIcon,
  Skeleton,
  Input,
  cn,
  MultiInput,
  Textarea,
  FileInput,
} from '@read-quill/design-system';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { z } from 'zod';
import ThreadFormsAttachments from '../forms/thread-forms-attachments';

const ThreadContentEditor = dynamic(() => import('./thread-content-editor'), { ssr: false });

export type CommunityThreadCreateFormData = z.infer<typeof createThreadValidationBaseSchema>;

const STEPS_DATA: MultiStepFormStep<CommunityThreadCreateFormData>[] = [
  {
    title: 'Title',
    fields: ['title'],
  },
  {
    title: 'Keywords',
    fields: ['keywords'],
  },
  {
    title: 'Content',
    fields: ['content.content'],
  },
  { title: 'Attachments', fields: ['content.attachments'] },
];

interface CreateThreadFormProps {
  onSubmit: (data: CommunityThreadCreateFormData) => void;
}

const CreateThreadForm: React.FC<CreateThreadFormProps> = (props) => {
  const { onSubmit } = props;

  const {
    form,
    currentStep,
    totalSteps,
    getCanGoNextStep,
    getCanGoPrevStep,
    getCanSubmit,
    gotoNextStep,
    gotoPrevStep,
  } = useMultiStepForm<CommunityThreadCreateFormData>({
    data: STEPS_DATA,
    resolver: createThreadValidationBaseSchema,
  });

  const isFormLoading = form.formState.isSubmitting;

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
          {currentStep === 0 && (
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter a concise and descriptive title for your thread" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {currentStep === 1 && (
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiInput placeholder="Please provide some keywords..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {currentStep === 2 && (
            <FormField
              control={form.control}
              name="content.content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {currentStep === 3 && <ThreadFormsAttachments />}

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
            {currentStep === totalSteps - 1 && (
              <Button
                aria-label="Post Thread"
                className={cn(isFormLoading && 'cursor-not-allowed')}
                disabled={isFormLoading || !getCanSubmit()}
                type="submit"
              >
                {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
                Post
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateThreadForm;

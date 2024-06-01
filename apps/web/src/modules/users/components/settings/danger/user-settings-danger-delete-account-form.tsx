'use client';

import React from 'react';
import {
  AlertDialogAction,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@read-quill/design-system';
import { DeleteIcon } from '@read-quill/design-system';
import { MultiStepFormStep } from '@modules/forms/hooks/use-multi-step-form';
import { DeleteAccountFormActionData } from '@modules/users/types/user-settings-validations.types';
import MultiStepFormWrapper from '@modules/forms/components/multi-step-form-wrapper';
import { cn } from '@read-quill/design-system';
import { LoadingIcon } from '@read-quill/design-system';
import { zodResolver } from '@hookform/resolvers/zod';
import { USER_SETTINGS_ACTIONS_VALIDATIONS_FORMS } from '@modules/users/validations/user-settings.validations';

const STEPS_DATA: MultiStepFormStep<DeleteAccountFormActionData>[] = [
  {
    title: 'Email',
    fields: ['accountEmail'],
  },
  {
    title: 'Confirmation',
    fields: ['deleteConfirmation'],
  },
];

interface UserSettingsDangerDeleteAccountFormProps {
  onSubmit: (data: DeleteAccountFormActionData) => void;
}

const UserSettingsDangerDeleteAccountForm: React.FC<UserSettingsDangerDeleteAccountFormProps> = (props) => {
  const { onSubmit } = props;

  return (
    <MultiStepFormWrapper
      data={STEPS_DATA}
      onSubmit={onSubmit}
      resolver={zodResolver(USER_SETTINGS_ACTIONS_VALIDATIONS_FORMS.DELETE_ACCOUNT)}
      renderSubmitButton={(form, getCanSubmit) => {
        const isFormLoading = form.formState.isSubmitting;
        return (
          <AlertDialogAction
            aria-label="Delete Annotation"
            className={cn(isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading || !getCanSubmit()}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <DeleteIcon className="mr-2" />}
            Delete
          </AlertDialogAction>
        );
      }}
    >
      {(form, currentStep) => (
        <>
          {currentStep === 0 && (
            <FormField
              control={form.control}
              name="accountEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Email</FormLabel>
                  <FormControl>
                    <Input placeholder="youremail@mail.com" {...field} />
                  </FormControl>
                  <FormDescription>Provide your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {currentStep === 1 && (
            <FormField
              control={form.control}
              name="deleteConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation</FormLabel>
                  <FormControl>
                    <Input placeholder="delete-account" {...field} />
                  </FormControl>
                  <FormDescription>Type "delete-account" to confirm.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </>
      )}
    </MultiStepFormWrapper>
  );
};
export default UserSettingsDangerDeleteAccountForm;

import React from 'react';
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormDescription,
  FormMessage,
  Button,
} from '@read-quill/design-system';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { USER_ACTIONS_VALIDATIONS_FORMS } from '@modules/users/validations/user.validations';
import { UserCompleteProfileFormActionData } from '@modules/users/types/user-validations.types';
import { CheckIcon } from '@read-quill/design-system';
import { LoadingIcon } from '@read-quill/design-system';

interface AuthCompleteProfileFormProps {
  onSubmit: (data: UserCompleteProfileFormActionData) => void;
  isPending: boolean;
}

const AuthCompleteProfileForm: React.FC<AuthCompleteProfileFormProps> = (props) => {
  const { onSubmit, isPending } = props;

  const form = useForm<UserCompleteProfileFormActionData>({
    resolver: zodResolver(USER_ACTIONS_VALIDATIONS_FORMS.COMPLETE_PROFILE),
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complete Name</FormLabel>
              <FormControl>
                <Input placeholder="Jhon Doe" {...field} />
              </FormControl>
              <FormDescription>Your complete name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          aria-label="Complete Profile"
          title="Complete Profile"
          disabled={isPending}
        >
          {isPending ? <LoadingIcon className="mr-2" /> : <CheckIcon className="mr-2" />}
          Complete Profile
        </Button>
      </form>
    </Form>
  );
};

export default AuthCompleteProfileForm;

import React from 'react';
import {
  Button,
  FileInput,
  FileUploadIcon,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  LoadingIcon,
} from '@read-quill/design-system';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { USER_ACTIONS_VALIDATIONS_FORMS } from '@modules/users/validations/user.validations';

import { UserUpdateAvatarFormActionData } from '@modules/users/types/user-validations.types';

interface UserProfileAvatarProps {
  onSubmit: (data: UserUpdateAvatarFormActionData) => void;
  isPending: boolean;
}

const UserProfileAvatarUpdateForm: React.FC<UserProfileAvatarProps> = (props) => {
  const { onSubmit, isPending } = props;

  const form = useForm<UserUpdateAvatarFormActionData>({
    resolver: zodResolver(USER_ACTIONS_VALIDATIONS_FORMS.UPDATE_AVATAR),
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="avatarImage"
          render={({ field: { value = [], ...rest } }) => (
            <FormItem className="col-span-2">
              <FormLabel>Avatar Image</FormLabel>
              <FormControl>
                <FileInput multiple={false} value={value} accept="image/*" {...rest} />
              </FormControl>
              <FormDescription>Avatar image picker.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" aria-label="Upload Avatar" title="Upload Avatar" disabled={isPending}>
          {isPending ? <LoadingIcon className="mr-2" /> : <FileUploadIcon className="mr-2" />}
          Upload Avatar
        </Button>
      </form>
    </Form>
  );
};

export default UserProfileAvatarUpdateForm;

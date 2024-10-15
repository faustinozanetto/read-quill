import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';

const ReferralsFormCode: React.FC = (props) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="referralCode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Referral Code</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Unique referral code.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ReferralsFormCode;

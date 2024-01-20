import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormDescription,
  FormMessage,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';

const DashboardReadRegistriesFormPagesRead: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="pagesRead"
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel>Pages Read</FormLabel>
          <FormControl>
            <Input
              inputMode="numeric"
              onChange={(e) => {
                const value = Number(e.target.value);
                onChange(value);
              }}
              placeholder="10"
              type="number"
              {...rest}
            />
          </FormControl>
          <FormDescription>Pages read.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardReadRegistriesFormPagesRead;

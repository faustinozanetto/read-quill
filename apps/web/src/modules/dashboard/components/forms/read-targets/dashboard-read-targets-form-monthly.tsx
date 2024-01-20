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

const DashboardReadTargetsFormMonthly: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="monthly"
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel>Monthly</FormLabel>
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
          <FormDescription>Target pages per month</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardReadTargetsFormMonthly;

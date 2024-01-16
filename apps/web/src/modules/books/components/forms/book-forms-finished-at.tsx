import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Button,
  Calendar,
  CalendarIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';

const BookFormsFinishedAt: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="finishedAt"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Finished At</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                  variant="outline"
                >
                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                disabled={(date: Date) => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
                mode="single"
                onSelect={(date) => {
                  field.onChange(date?.toISOString());
                }}
                selected={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>The date you finished the book at.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookFormsFinishedAt;

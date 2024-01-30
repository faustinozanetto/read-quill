import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Button,
  CheckIcon,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
  ArrowsSortIcon,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';
import type { BooksNamesGetResponse } from '@modules/api/types/books-api.types';

interface DashboardReadRegistriesFormBookProps {
  booksNames: BooksNamesGetResponse['booksNames'];
}

const DashboardReadRegistriesFormBook: React.FC<DashboardReadRegistriesFormBookProps> = (props) => {
  const { booksNames } = props;

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="bookId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Book</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn('justify-between', !field.value && 'text-muted-foreground')}
                  role="combobox"
                  variant="outline"
                >
                  {field.value ? booksNames.find((book) => book.id === field.value)?.name : 'Select book'}
                  <ArrowsSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] md:w-full p-0">
              <Command>
                <CommandInput className="h-9" placeholder="Search book..." />
                <CommandEmpty>No book found.</CommandEmpty>
                <CommandGroup>
                  {booksNames.map((book) => (
                    <CommandItem
                      key={book.name}
                      onSelect={() => {
                        form.setValue('bookId', book.id);
                      }}
                      value={book.name}
                    >
                      {book.name}
                      <CheckIcon
                        className={cn('ml-auto h-4 w-4', book.id === field.value ? 'opacity-100' : 'opacity-0')}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>Select the book you read.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardReadRegistriesFormBook;

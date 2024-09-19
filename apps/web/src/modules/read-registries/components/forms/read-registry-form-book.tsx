import React, { useState } from 'react';
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
  CommandList,
  Input,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';
import { DashboardBookName } from '@modules/dashboard/types/dashboard.types';
import Image from 'next/image';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';

interface ReadRegistryFormBookProps {
  booksNames: DashboardBookName[];
}

const ReadRegistryFormBook: React.FC<ReadRegistryFormBookProps> = (props) => {
  const { booksNames } = props;

  const form = useFormContext();
  const [filterBooks, setFilterBooks] = useState<string>();

  const handleFilterBookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterBooks(value);
  };

  const filteredBooks = filterBooks ? booksNames.filter((book) => book.name.includes(filterBooks)) : booksNames;

  return (
    <FormField
      control={form.control}
      name="bookId"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Book</FormLabel>
          <Input id="filter-book" name="filter-book" placeholder="Book name..." onChange={handleFilterBookChange} />
          {filteredBooks.length > 0 ? (
            <div className="flex max-w-full gap-4 overflow-x-scroll relative">
              {filteredBooks.map((book) => {
                const bookImageUrl = getImagePublicUrl('BookCovers', book.image.path);
                const isSelected = field.value && field.value === book.id;
                const label = `Select ${book.name}`;

                return (
                  <button
                    key={book.id}
                    type="button"
                    title={label}
                    aria-label={label}
                    className={cn(
                      'flex flex-col items-center justify-center gap-2 rounded-lg relative shrink-0 disabled:cursor-not-allowed',
                      isSelected ? 'bg-foreground' : 'border-2 border-primary/50 hover:border-primary'
                    )}
                    onClick={() => form.setValue('bookId', book.id, { shouldValidate: true })}
                    disabled={form.formState.isSubmitting}
                  >
                    <Image
                      src={bookImageUrl}
                      alt="Test"
                      width={160}
                      height={160}
                      className="w-full h-20 md:h-36 object-cover rounded-t-lg"
                    />
                    <span
                      className={cn(
                        'font-semibold overflow-ellipsis text-sm pb-2',
                        isSelected ? 'text-background' : 'text-foreground'
                      )}
                    >
                      {book.name}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p>No books match your filter, try other one!</p>
          )}

          <FormDescription>Select the book you read.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ReadRegistryFormBook;

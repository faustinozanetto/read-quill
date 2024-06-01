import BookCreate from '@modules/books/components/create/book-create';
import { PlusIcon } from '@read-quill/design-system';
import { Button } from '@read-quill/design-system';
import { useRouter } from 'next/navigation';
import React from 'react';

const UserLibraryBooksHeader: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col rounded-lg shadow border p-4 gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books</h1>
        <div>
          <BookCreate
            createButton={
              <Button aria-label="Create Book" size="sm">
                <PlusIcon className="mr-2 stroke-current" />
                Create Book
              </Button>
            }
            onSuccess={(data) => {
              router.push(`/books/${data.book.id}`);
            }}
          />
        </div>
      </div>
      <p>
        Welcome to your personal bookshelf! Here, you&apos;ll find all the books you&apos;ve added and organized, ready
        to dive into whenever you&apos;re ready. Browse through your collection and explore new literary adventures.
        Your bookshelf awaits!
      </p>
    </div>
  );
};

export default UserLibraryBooksHeader;

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Book } from '@read-quill/database';
import BookPagesBadge from '../common/book-pages-badge';
import BookLanguageBadge from '../common/book-language-badge';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@read-quill/design-system';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { BookWithDetails } from '@modules/books/types/book.types';

const containerVariants = cva('rounded-lg border transition-transform hover:scale-[101%] shadow hover:border-primary', {
  variants: {
    variant: {
      landscape: 'flex gap-2.5',
      vertical: 'flex flex-col',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});

const metadataVariants = cva('', {
  variants: {
    variant: {
      landscape: 'py-2.5',
      vertical: 'p-2.5',
    },
  },
});

const imageVariants = cva(' shadow object-cover object-center', {
  variants: {
    variant: {
      landscape: 'aspect-square w-24 rounded-l-lg ',
      vertical: 'h-40 w-full rounded-t-lg',
    },
  },
});

export type BookCardStyleProps = VariantProps<typeof containerVariants>;

interface BookCardProps extends BookCardStyleProps {
  book: BookWithDetails;
}

const BookCard: React.FC<BookCardProps> = (props) => {
  const { book, variant = 'landscape' } = props;

  return (
    <Link href={`/books/${book.id}`}>
      <div className={cn(containerVariants({ variant }))}>
        {book.image && (
          <Image
            alt="Book Cover"
            aria-label="Boko Cover"
            className={imageVariants({ variant })}
            draggable={false}
            height={512}
            src={getImagePublicUrl('BookCovers', book.image.path)}
            width={512}
          />
        )}
        <div className={metadataVariants({ variant })}>
          <span className="font-bold uppercase blockt truncate  line-clamp-1">{book.name}</span>
          <span className="font-medium text-sm block">{book.author}</span>
          <div className="mt-auto">
            <BookPagesBadge className="mr-2" pageCount={book.pageCount} />
            <BookLanguageBadge language={book.language} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

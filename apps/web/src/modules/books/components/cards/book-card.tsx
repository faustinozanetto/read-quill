import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookPagesBadge from '../common/book-pages-badge';
import BookLanguageBadge from '../common/book-language-badge';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@read-quill/design-system';
import { BookWithDetails } from '@modules/books/types/book.types';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';

const containerVariants = cva('rounded-lg border transition-transform hover:scale-[101%] hover:border-primary', {
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

const imageVariants = cva('object-cover object-center', {
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
    <Link href={`/books/${book.id}`} title={`View ${book.name} Details`}>
      <div className={cn(containerVariants({ variant }))}>
        <Image
          src={getImagePublicUrl('BookCovers', book.image.path)}
          width={450}
          height={450}
          alt="Book Cover"
          className={imageVariants({
            variant,
          })}
          blurDataURL={book.placeholderImage.blurUrl}
          placeholder="blur"
        />
        <div className={metadataVariants({ variant })}>
          <span className="font-bold uppercase blockt text-ellipsis line-clamp-1">{book.name}</span>
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

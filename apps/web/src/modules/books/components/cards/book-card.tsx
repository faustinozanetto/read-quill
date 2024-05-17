import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Book } from '@read-quill/database';
import BookPagesBadge from '../common/book-pages-badge';
import BookLanguageBadge from '../common/book-language-badge';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = (props) => {
  const { book } = props;

  return (
    <Link href={`/books/${book.id}`}>
      <div className="rounded-lg border p-4 transition-transform hover:scale-[101%] shadow h-full flex flex-col">
        <Image
          alt="Book Cover"
          aria-label="Boko Cover"
          className="h-40 w-full rounded-lg border shadow object-cover object-center"
          draggable={false}
          height={512}
          src={book.coverImage}
          width={512}
        />
        <span className="font-bold uppercase block mt-1">{book.name}</span>
        <span className="font-medium text-sm block">{book.author}</span>
        <div className="mt-auto">
          <BookPagesBadge className="mr-2" pageCount={book.pageCount} />
          <BookLanguageBadge language={book.language} />
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

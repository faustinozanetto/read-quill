import React, { useState } from 'react';
import type { Annotation } from '@read-quill/database';
import { Badge, EyeIcon, Button, cn } from '@read-quill/design-system';
import { useBookStore } from '@modules/books/state/book.slice';
import { useSession } from 'next-auth/react';
import BookAnnotationManagement from '../management/book-annotation-management';

interface BookAnnotationCardProps {
  annotation: Annotation;
}

const BookAnnotationCard: React.FC<BookAnnotationCardProps> = (props) => {
  const { annotation } = props;
  const { book } = useBookStore();
  const { data: session } = useSession();
  const [revealContent, setRevealContent] = useState(false);

  const isBookOwner = Boolean(book?.readerId === session?.user.id);

  return (
    <div className="rounded-lg border transition-transform hover:scale-[101%] shadow flex flex-col">
      <div className="px-4 pt-4 flex justify-between items-start mb-2">
        <div>
          <span className="text-lg font-semibold block">{annotation.title}</span>
          <Badge>{annotation.chapter}</Badge>
        </div>
        {isBookOwner ? <BookAnnotationManagement annotation={annotation} /> : null}
      </div>
      <div className="relative px-4 pb-2">
        <p className={cn('line-clamp-4', !revealContent && 'blur-sm')}>{annotation.content}</p>
        {!revealContent ? (
          <>
            <Button
              className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
              onClick={() => {
                setRevealContent(true);
              }}
            >
              <EyeIcon className="mr-2" />
              Click to reveal
            </Button>
            <div className="absolute inset-0 bg-foreground/20 z-10 rounded-b-lg" />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BookAnnotationCard;

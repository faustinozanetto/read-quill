import React, { useState } from 'react';
import type { Annotation } from '@read-quill/database';
import { Badge, EyeIcon, Button, cn } from '@read-quill/design-system';

interface BookAnnotationCardProps {
  annotation: Annotation;
}

const BookAnnotationCard: React.FC<BookAnnotationCardProps> = (props) => {
  const { annotation } = props;

  const [revealContent, setRevealContent] = useState(false);

  return (
    <div className="rounded-lg border transition-transform hover:scale-[101%] shadow flex flex-col">
      <div className="flex justify-between p-4">
        <span className="text-lg font-semibold">{annotation.title}</span>
        <Badge>{annotation.chapter}</Badge>
      </div>
      <div className="relative px-4 py-2">
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

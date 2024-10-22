import React, { useState } from 'react';
import type { Annotation } from '@read-quill/database';
import { Badge, EyeIcon, Button, cn, Separator } from '@read-quill/design-system';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import AnnotationManagement from '../management/annotation-management';

interface AnnotationCardProps {
  annotation: Annotation;
}

const AnnotationCard: React.FC<AnnotationCardProps> = (props) => {
  const { annotation } = props;
  const { isBookOwner } = useIsBookOwner();

  const [revealContent, setRevealContent] = useState(false);

  return (
    <div className="rounded-lg border flex flex-col">
      <div className="p-4 flex justify-between items-start ">
        <div>
          <span className="text-lg font-semibold block">{annotation.title}</span>
          <Badge>{annotation.chapter}</Badge>
        </div>
        {isBookOwner ? <AnnotationManagement annotation={annotation} /> : null}
      </div>
      <Separator />
      <div className="relative p-4 grow">
        <p className={cn('line-clamp-4 text-sm', !revealContent && 'blur-sm')}>{annotation.content}</p>
        {!revealContent ? (
          <>
            <Button
              aria-label="Reveal Annotation"
              className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
              onClick={() => {
                setRevealContent(true);
              }}
              size="sm"
              variant="outline"
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

export default AnnotationCard;

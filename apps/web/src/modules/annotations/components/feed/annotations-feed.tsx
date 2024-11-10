import React from 'react';
import type { Annotation } from '@read-quill/database';
import AnnotationCard from '../cards/annotation-card';
import { cn } from '@read-quill/design-system';

interface AnnotationsFeedProps {
  annotations: Annotation[];
  className?: string;
}

const AnnotationsFeed: React.FC<AnnotationsFeedProps> = (props) => {
  const { annotations, className } = props;

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 2xl:grid-cols-3', className)}>
      {annotations.map((annotation) => {
        return <AnnotationCard annotation={annotation} key={`annotation-${annotation.id}`} />;
      })}
    </div>
  );
};

export default AnnotationsFeed;

import React from 'react';
import type { Annotation } from '@read-quill/database';
import AnnotationCard from '../cards/annotation-card';

interface AnnotationsFeedProps {
  annotations: Annotation[];
}

const AnnotationsFeed: React.FC<AnnotationsFeedProps> = (props) => {
  const { annotations } = props;

  return (
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {annotations.map((annotation) => {
        return <AnnotationCard annotation={annotation} key={`annotation-${annotation.id}`} />;
      })}
    </div>
  );
};

export default AnnotationsFeed;

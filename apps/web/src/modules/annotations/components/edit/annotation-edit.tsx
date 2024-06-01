import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  useToast,
} from '@read-quill/design-system';
import type { Annotation } from '@read-quill/database';

import { UseEditAnnotationParams, useEditAnnotation } from '@modules/annotations/hooks/use-edit-annotation';
import AnnotationEditEditForm from './annotation-edit-form';
import { EditAnnotationFormActionData } from '@modules/annotations/types/annotation-validations.types';

interface AnnotationEditProps {
  annotation: Annotation;
  onSuccess: UseEditAnnotationParams['onSuccess'];
  editButton: React.ReactNode;
}

const AnnotationEdit: React.FC<AnnotationEditProps> = (props) => {
  const { annotation, editButton, onSuccess } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  const { editAnnotation } = useEditAnnotation({
    onSuccess: async (data, variables, context) => {
      if (data.annotation) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book annotation edited successfully!` });
      }
    },
  });

  const handleEditAnnotation = async (data: EditAnnotationFormActionData) => {
    await editAnnotation({
      ...data,
      annotationId: annotation.id,
    });
  };

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{editButton}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Annotation</DialogTitle>
          <DialogDescription>Edit a annotation of the book.</DialogDescription>
        </DialogHeader>

        <AnnotationEditEditForm initialData={annotation} onSubmit={handleEditAnnotation} />
      </DialogContent>
    </Dialog>
  );
};

export default AnnotationEdit;

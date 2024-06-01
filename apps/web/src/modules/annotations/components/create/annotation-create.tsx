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

import { UseCreateAnnotationParams, useCreateAnnotation } from '@modules/annotations/hooks/use-create-annotation';
import AnnotationCreateForm from './annotation-create-form';
import { CreateAnnotationFormActionData } from '@modules/annotations/types/annotation-validations.types';

interface AnnotationCreateProps {
  bookId: string;
  onSuccess: UseCreateAnnotationParams['onSuccess'];
  createButton: React.ReactNode;
}

const AnnotationCreate: React.FC<AnnotationCreateProps> = (props) => {
  const { bookId, createButton, onSuccess } = props;

  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { createAnnotation } = useCreateAnnotation({
    onSuccess: async (data, variables, context) => {
      if (data.annotation) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book annotation added successfully!` });
      }
    },
  });

  const handleCreateAnnotation = async (data: CreateAnnotationFormActionData) => {
    await createAnnotation({
      ...data,
      bookId,
    });
  };

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{createButton}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Annotation</DialogTitle>
          <DialogDescription>Add a annotation of the book.</DialogDescription>
        </DialogHeader>

        <AnnotationCreateForm onSubmit={handleCreateAnnotation} />
      </DialogContent>
    </Dialog>
  );
};

export default AnnotationCreate;

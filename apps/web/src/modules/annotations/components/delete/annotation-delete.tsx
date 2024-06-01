import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  buttonVariants,
  useToast,
} from '@read-quill/design-system';
import { UseDeleteAnnotationParams, useDeleteAnnotation } from '@modules/annotations/hooks/use-delete-annotation';

interface AnnotationDeleteProps {
  annotationId: string;
  onSuccess: UseDeleteAnnotationParams['onSuccess'];
  deleteButton: React.ReactNode;
}

const AnnotationDelete: React.FC<AnnotationDeleteProps> = (props) => {
  const { annotationId, deleteButton, onSuccess } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  const { deleteAnnotation } = useDeleteAnnotation({
    onSuccess: async (data, variables, context) => {
      if (data && data.success) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Annotation deleted successfully!` });
      }
    },
  });

  return (
    <AlertDialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <AlertDialogTrigger asChild>{deleteButton}</AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Annotation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete it?. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={async () => {
              await deleteAnnotation({ annotationId });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AnnotationDelete;

import React from 'react';
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
  LoadingIcon,
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

  const { toast } = useToast();

  const { deleteAnnotation, isPending } = useDeleteAnnotation({
    onSuccess: async (data, variables, context) => {
      if (data.data?.success) {
        await onSuccess(data, variables, context);
        toast({ variant: 'success', content: `Annotation deleted successfully!` });
      }
    },
  });

  return (
    <AlertDialog>
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
            disabled={isPending}
            onClick={async (e) => {
              e.preventDefault();
              await deleteAnnotation({ annotationId });
            }}
          >
            {isPending && <LoadingIcon className="mr-2" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AnnotationDelete;

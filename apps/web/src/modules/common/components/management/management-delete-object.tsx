import React from 'react';
import type { ButtonProps } from '@read-quill/design-system';
import {
  AlertDialog,
  AlertDialogTrigger,
  Button,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@read-quill/design-system';

interface ManagementDeleteObjectProps extends Omit<ButtonProps, 'onClick'> {
  children: React.ReactNode;
  label: string;
  onDeleted: () => void;
}

const ManagementDeleteObject: React.FC<ManagementDeleteObjectProps> = (props) => {
  const { children, label, onDeleted, variant = 'destructive', ...rest } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button aria-label={label} variant={variant} {...rest}>
          {children}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{label}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete it?. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleted}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ManagementDeleteObject;

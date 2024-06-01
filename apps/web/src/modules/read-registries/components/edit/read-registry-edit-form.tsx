import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, cn, LoadingIcon, EditIcon } from '@read-quill/design-system';
import type { ReadRegistry } from '@read-quill/database';
import DashboardReadRegistriesFormPagesRead from '@modules/dashboard/components/forms/read-registries/dashboard-read-registries-page-count';
import { EditReadRegistryFormActionData } from '@modules/read-registries/types/read-registries-validations.types';
import { READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS } from '@modules/read-registries/lib/read-registries.validations';

interface ReadRegistryEditFormProps {
  initialData: ReadRegistry;
  onSubmit: (data: EditReadRegistryFormActionData) => void;
}

const ReadRegistryEditForm: React.FC<ReadRegistryEditFormProps> = (props) => {
  const { initialData, onSubmit } = props;

  const form = useForm<EditReadRegistryFormActionData>({
    resolver: zodResolver(READ_REGISTRY_ACTIONS_VALIDATIONS_FORMS.EDIT),
    mode: 'onBlur',
    defaultValues: {
      pagesRead: initialData.pagesRead,
      registryId: initialData.id,
    },
  });

  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <DashboardReadRegistriesFormPagesRead />

        <DialogFooter className="col-span-2">
          <Button
            aria-label="Edit Read Registry"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2" />}
            Edit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ReadRegistryEditForm;

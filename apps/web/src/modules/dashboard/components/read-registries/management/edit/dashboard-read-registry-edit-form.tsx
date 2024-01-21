import React from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, cn, LoadingIcon, EditIcon } from '@read-quill/design-system';
import { editReadRegistryValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import DashboardReadRegistriesFormPagesRead from '@modules/dashboard/components/forms/read-registries/dashboard-read-registries-page-count';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { ReadRegistry } from '@read-quill/database';

export type DashboardReadRegistryEditFormData = z.infer<typeof editReadRegistryValidationSchema>;

interface DashboardReadRegistryEditFormProps {
  initialData: ReadRegistry;
  onSubmit: (data: DashboardReadRegistryEditFormData) => void;
}

const DashboardReadRegistryEditForm: React.FC<DashboardReadRegistryEditFormProps> = (props) => {
  const { initialData, onSubmit } = props;

  const form = useForm<DashboardReadRegistryEditFormData>({
    resolver: zodResolver(editReadRegistryValidationSchema),
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

export default DashboardReadRegistryEditForm;

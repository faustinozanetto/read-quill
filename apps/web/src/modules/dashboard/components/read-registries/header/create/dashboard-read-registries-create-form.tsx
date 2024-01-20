import React from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, DialogFooter, Form, PlusIcon, cn, LoadingIcon } from '@read-quill/design-system';
import { createReadRegistryValidationSchema } from '@modules/dashboard/validations/dashboard.validations';
import DashboardReadRegistriesFormPagesRead from '@modules/dashboard/components/forms/read-registries/dashboard-read-registries-page-count';
import DashboardReadRegistriesFormBook from '@modules/dashboard/components/forms/read-registries/dashboard-read-registries-book';
import { __URL__ } from '@modules/common/lib/common.constants';
import { Book } from '@read-quill/database';
import { useQueryClient } from '@tanstack/react-query';

export type DashboardReadRegistriesCreateFormData = z.infer<typeof createReadRegistryValidationSchema>;

interface DashboardReadRegistriesCreateFormProps {
  onSubmit: (data: DashboardReadRegistriesCreateFormData) => void;
}

const DashboardReadRegistriesCreateForm: React.FC<DashboardReadRegistriesCreateFormProps> = (props) => {
  const { onSubmit } = props;

  const queryClient = useQueryClient();

  const form = useForm<DashboardReadRegistriesCreateFormData>({
    resolver: zodResolver(createReadRegistryValidationSchema),
    mode: 'onBlur',
  });

  const books = queryClient.getQueryData<Book[]>(['dashboard-books']) ?? [];
  const isFormLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <DashboardReadRegistriesFormPagesRead />
        <DashboardReadRegistriesFormBook books={books} />

        <DialogFooter className="col-span-2">
          <Button
            aria-label="Create Read Registry"
            className={cn('w-full', isFormLoading && 'cursor-not-allowed')}
            disabled={isFormLoading}
            type="submit"
          >
            {isFormLoading ? <LoadingIcon className="mr-2" /> : <PlusIcon className="mr-2" />}
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DashboardReadRegistriesCreateForm;

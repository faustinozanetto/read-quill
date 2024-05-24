import {
  CreateThreadFormActionData,
  ThreadUploadContentAttachment,
} from '@modules/community/types/community-thread-validations.types';

import {
  Button,
  DeleteIcon,
  FileInput,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@read-quill/design-system';
import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const ThreadFormsAttachments: React.FC = () => {
  const { control, setValue, watch, trigger, formState } = useFormContext<CreateThreadFormActionData>();
  const { fields, remove } = useFieldArray<CreateThreadFormActionData>({
    control,
    name: 'content.attachments',
  });

  const attachments = (watch('content.attachments') ?? []) as ThreadUploadContentAttachment[];

  const handleFilesChange = useCallback(
    (files: File[]) => {
      const mappedFiles: ThreadUploadContentAttachment[] = files.map((file) => ({
        image: file,
        description: file.name,
      }));
      setValue('content.attachments', mappedFiles);
    },
    [setValue]
  );

  useEffect(() => {
    trigger('content.attachments');
  }, [attachments, trigger]);

  return (
    <ol className="list-decimal list-inside">
      <FormField
        control={control}
        name="content.attachments"
        render={({ field }) => (
          <FormItem>
            <li>Upload the attachments here.</li>
            <FormControl>
              <FileInput
                name={field.name}
                value={attachments.map((att) => att.image)}
                onChange={handleFilesChange}
                multiple
                accept="image/*"
                showDeleteItemButton={false}
              />
            </FormControl>
            <div className="flex flex-col gap-2">
              {fields.length > 0 && (
                <>
                  <li>Set descriptions here.</li>
                  {fields.map((attachmentField, index) => {
                    return (
                      <FormField
                        key={attachmentField.id}
                        control={control}
                        name={`content.attachments.${index}.description` as const}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Image description."
                                  defaultValue={attachmentField.description}
                                />
                              </FormControl>
                              <Button size="icon" variant="destructive" onClick={() => remove(index)}>
                                <DeleteIcon className="stroke-current" />
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </FormItem>
        )}
      />
    </ol>
  );
};

export default ThreadFormsAttachments;

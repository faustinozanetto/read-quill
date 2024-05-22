import { ThreadContentAttachment } from '@modules/community/types/community.types';
import { FileInput, FormControl, FormField, FormItem, FormMessage, Input } from '@read-quill/design-system';
import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ThreadFormsAttachmentsProps {}

const ThreadFormsAttachments: React.FC<ThreadFormsAttachmentsProps> = (props) => {
  const {} = props;

  const form = useFormContext();
  const [value, setValue] = useState<ThreadContentAttachment[]>([]);

  const handleFilesChange = useCallback((files: File[]) => {
    const mappedFiles: ThreadContentAttachment[] = files.map((file) => ({ image: file, description: '' }));

    setValue(mappedFiles);
  }, []);

  const handleImageDescriptionChange = (attachment: File, description: string) => {
    const attachmentToUpdate = value.findIndex((file) => file.image.name === attachment.name);
    if (attachmentToUpdate === -1) return;

    setValue((prev) => {
      const updatedValues = [...prev];
      updatedValues[attachmentToUpdate].description = description;
      return updatedValues;
    });
  };

  useEffect(() => {
    form.setValue('content.attachments', value);
  }, [value]);

  return (
    <FormField
      control={form.control}
      name="content.attachments"
      render={({ field: { name, disabled } }) => (
        <FormItem>
          <p>Upload the attachments here.</p>
          <FormControl>
            <FileInput name={name} disabled={disabled} value={[]} onChange={handleFilesChange} multiple />
          </FormControl>
          <div className="flex flex-col gap-2">
            <p>Set descriptions here.</p>
            {value.map((attachment) => {
              return (
                <div key={attachment.image.name}>
                  <Input
                    id={attachment.image.name}
                    placeholder="Image description."
                    onChange={(e) => handleImageDescriptionChange(attachment.image, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ThreadFormsAttachments;

import { ThreadUploadContentAttachment } from '@modules/community/types/community-thread-validations.types';
import { FileInput, FormControl, FormField, FormItem, FormMessage, Input } from '@read-quill/design-system';
import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ThreadFormsAttachments: React.FC = () => {
  const form = useFormContext();
  const [attachments, setAttachments] = useState<ThreadUploadContentAttachment[]>([]);

  const handleFilesChange = useCallback((files: File[]) => {
    const mappedFiles: ThreadUploadContentAttachment[] = files.map((file) => ({ image: file, description: '' }));

    setAttachments(mappedFiles);
  }, []);

  const handleImageDescriptionChange = (attachment: File, description: string) => {
    const attachmentToUpdate = attachments.findIndex((file) => file.image.name === attachment.name);
    if (attachmentToUpdate === -1) return;

    setAttachments((prev) => {
      const updatedValues = [...prev];
      updatedValues[attachmentToUpdate].description = description;
      return updatedValues;
    });
  };

  useEffect(() => {
    form.setValue('content.attachments', attachments);
  }, [attachments]);

  return (
    <FormField
      control={form.control}
      name="content.attachments"
      render={({ field: { value = [], name, disabled } }) => (
        <FormItem>
          <p>Upload the attachments here.</p>
          <FormControl>
            <FileInput
              name={name}
              disabled={disabled}
              value={value}
              onChange={handleFilesChange}
              multiple
              accept="image/*"
            />
          </FormControl>
          <div className="flex flex-col gap-2">
            {value.length > 0 && (
              <>
                <p>Set descriptions here.</p>
                {attachments.map((attachment) => {
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
              </>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ThreadFormsAttachments;

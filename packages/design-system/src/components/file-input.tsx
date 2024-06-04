'use client';

import * as React from 'react';
import { useMemo } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { DeleteIcon, FileIcon } from './icons';
import { Button } from './button';

interface FileInputEntryProps {
  file: File;
  onDelete: (name: string) => void;
  showDeleteItemButton: boolean;
}

const FileInputEntry: React.FC<FileInputEntryProps> = ({ file, onDelete, showDeleteItemButton }) => {
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="aspect-square">
            <img alt={file.name} className="h-10 w-10 aspect-square rounded-md border object-cover" src={url} />
          </TooltipTrigger>
          <TooltipContent className="bg-background p-0">
            <img alt={file.name} className="h-44 w-44 rounded-md border object-cover" src={url} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="text-sm mr-auto text-wrap max-w-72 line-clamp-1">{file.name}</span>
      {showDeleteItemButton && (
        <Button onClick={() => onDelete(file.name)} size="icon" variant="destructive" className="aspect-square">
          <DeleteIcon className="stroke-current" />
        </Button>
      )}
    </div>
  );
};

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'className'> {
  value: File[];
  onChange: (files: File[]) => void;
  showDeleteItemButton?: boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>((props, _ref) => {
  const { multiple, value, onChange, showDeleteItemButton = true, ...rest } = props;
  const hiddenFileInput = React.useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.validity && event.target.files) {
      const eventFiles = Array.from(event.target.files);
      onChange(value.concat(eventFiles));
    }
  };

  const handleChooseFile = (): void => {
    hiddenFileInput.current?.click();
  };

  const handleDeleteFile = (name: string): void => {
    onChange(value.filter((file) => file.name !== name));
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleChooseFile} type="button">
        <FileIcon className="mr-2" />
        Choose File{multiple ? 's' : null}
      </Button>
      <input
        className="hidden"
        multiple={multiple}
        onChange={handleInputChange}
        ref={hiddenFileInput}
        type="file"
        {...rest}
      />
      <div className="flex flex-col gap-1 p-2 border-2 border-dashed rounded-md">
        {!value.length ? <p className="text-sm">No files selected!</p> : null}
        {value.length
          ? value.map((file) => (
              <FileInputEntry
                file={file}
                key={file.name}
                onDelete={handleDeleteFile}
                showDeleteItemButton={showDeleteItemButton}
              />
            ))
          : null}
      </div>
    </div>
  );
});

FileInput.displayName = 'FileInput';

export { FileInput };

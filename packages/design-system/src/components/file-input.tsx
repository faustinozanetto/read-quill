import * as React from 'react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Button, DeleteIcon } from '..';

interface FileInputEntryProps {
  file: File;
  onDelete: (name: string) => void;
}

const FileInputEntry: React.FC<FileInputEntryProps> = (props) => {
  const { file, onDelete } = props;

  const [url, setUrl] = useState<string>(URL.createObjectURL(file));

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <img className="h-10 w-10 aspect-square rounded-md border object-cover" src={url} alt={file.name} />
          </TooltipTrigger>
          <TooltipContent className="bg-background p-0">
            <img className="h-44 w-44 rounded-md border object-cover" src={url} alt={file.name} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="text-sm mr-auto">{file.name}</span>
      <Button size="icon" variant="destructive" onClick={() => onDelete(file.name)}>
        <DeleteIcon className="stroke-current" />
      </Button>
    </div>
  );
};

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  value: File | File[];
  onChange: (files: File[]) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, multiple, value = [], onChange, ...props }, ref) => {
    const hiddenFileInput = React.useRef<HTMLInputElement | null>(null);

    const [files, setFiles] = React.useState<File[]>(value instanceof Array ? value : [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.validity && event.target.files) {
        const files = Array.from(event.target.files);
        setFiles((prev) => prev.concat(files));
      }
    };

    const handleChooseFile = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!hiddenFileInput || !hiddenFileInput.current) return;

      hiddenFileInput.current.click();
    };

    React.useEffect(() => {
      onChange(files);
    }, [files]);

    return (
      <div className="flex flex-col gap-2">
        <Button type="button" onClick={handleChooseFile}>
          Choose File{multiple && 's'}
        </Button>
        <input
          ref={hiddenFileInput}
          className="hidden"
          type="file"
          onChange={handleInputChange}
          multiple={multiple}
          {...props}
        />
        <div className="flex flex-col gap-1 p-2 border border-dashed rounded-md">
          {files.length === 0 && <p className="text-sm">No files selected!</p>}
          {files.length > 0 &&
            files.map((file) => (
              <FileInputEntry
                key={file.name}
                file={file}
                onDelete={(name) => {
                  setFiles((prev) => {
                    const filtered = prev.filter((f) => f.name !== name);
                    return filtered;
                  });
                }}
              />
            ))}
        </div>
      </div>
    );
  }
);
FileInput.displayName = 'FileInput';

export { FileInput };

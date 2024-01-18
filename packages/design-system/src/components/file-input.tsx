import * as React from 'react';
import { useMemo } from 'react';
import { Button, DeleteIcon } from '..';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface FileInputEntryProps {
  file: File;
  onDelete: (name: string) => void;
}

const FileInputEntry: React.FC<FileInputEntryProps> = (props) => {
  const { file, onDelete } = props;

  const url = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <img alt={file.name} className="h-10 w-10 aspect-square rounded-md border object-cover" src={url} />
          </TooltipTrigger>
          <TooltipContent className="bg-background p-0">
            <img alt={file.name} className="h-44 w-44 rounded-md border object-cover" src={url} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="text-sm mr-auto">{file.name}</span>
      <Button
        onClick={() => {
          onDelete(file.name);
        }}
        size="icon"
        variant="destructive"
      >
        <DeleteIcon className="stroke-current" />
      </Button>
    </div>
  );
};

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'className'> {
  value: File | File[];
  onChange: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = (props) => {
  const { multiple, value = [], onChange, ...rest } = props;
  const hiddenFileInput = React.useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = React.useState<File[]>(value instanceof Array ? value : [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.validity && event.target.files) {
      const eventFiles = Array.from(event.target.files);
      setFiles((prev) => prev.concat(eventFiles));
    }
  };

  const handleChooseFile = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!hiddenFileInput?.current) return;

    hiddenFileInput.current.click();
  };

  React.useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleChooseFile} type="button">
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
      <div className="flex flex-col gap-1 p-2 border border-dashed rounded-md">
        {files.length === 0 && <p className="text-sm">No files selected!</p>}
        {files.length > 0 &&
          files.map((file) => (
            <FileInputEntry
              file={file}
              key={file.name}
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
};

export { FileInput };

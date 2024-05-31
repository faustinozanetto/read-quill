import * as React from 'react';

import { cn } from '../lib/design-system.lib';
import { Button } from './button';
import { Badge } from './badge';
import { XIcon, PlusIcon } from './icons';
import { Input } from './input';

interface MultiEntryEntryProps {
  value: string;
  index: number;
  disabled?: boolean;
  entryClassName?: string;
  handleRemoveValue: (index: number) => void;
}

const MultiInputEntry: React.FC<MultiEntryEntryProps> = (props) => {
  const { value, index, entryClassName, disabled, handleRemoveValue } = props;

  return (
    <Badge
      className={cn(
        'data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground',
        'data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground',
        entryClassName
      )}
      data-disabled={disabled || undefined}
    >
      {value}
      <button
        className={cn(
          'ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2',
          disabled && 'hidden'
        )}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleRemoveValue(index);
          }
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={() => handleRemoveValue(index)}
        aria-label={`Remove ${value} entry`}
      >
        <XIcon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
      </button>
    </Badge>
  );
};

export type MultiInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'className'> & {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  entryClassName?: string;
};

const MultiInput = React.forwardRef<HTMLInputElement, MultiInputProps>((props, ref) => {
  const { id, onChange, value = [], className, entryClassName, disabled, ...rest } = props;

  const [inputValue, setInputValue] = React.useState('');

  const handleAddValue = () => {
    if (inputValue.trim() === '') return;

    if (value.find((v) => v === inputValue.trim())) return;

    onChange([...value, inputValue.trim()]);
    setInputValue('');
  };

  const handleRemoveValue = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <Input
          id={id}
          ref={ref}
          className={cn('h-10', className)}
          aria-label="Add new value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              handleAddValue();
            }
          }}
          {...rest}
        />
        <Button
          size="icon"
          variant="ghost"
          aria-label="Add value"
          className="absolute top-2 right-2 h-6 w-6"
          disabled={disabled}
          onClick={handleAddValue}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((val, index) => (
          <MultiInputEntry
            key={val}
            value={val}
            index={index}
            disabled={disabled}
            handleRemoveValue={handleRemoveValue}
            entryClassName={entryClassName}
          />
        ))}
      </div>
    </div>
  );
});

MultiInput.displayName = 'MultiInput';

export { MultiInput };

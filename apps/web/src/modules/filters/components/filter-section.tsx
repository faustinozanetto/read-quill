import React, { useState } from 'react';
import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ResetIcon,
} from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';

/**
 * Props for the FilterSection component.
 */
interface FilterSectionProps {
  /** The title of the filter section. */
  title: string;
  /** The content of the filter section. */
  children: React.ReactNode;
  /** Function to reset the filter associated with this section. */
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const FilterSection: React.FC<FilterSectionProps> = (props) => {
  const { title, children, onResetFilter } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible className="space-y-2" onOpenChange={setIsOpen} open={isOpen}>
      <div className="flex items-center space-x-1">
        <h4 className="text-sm font-semibold mr-auto">{title}</h4>
        <Button
          aria-label="Open Section"
          className="aspect-square p-1"
          onClick={onResetFilter}
          size="sm"
          variant="ghost-destructive"
        >
          <ResetIcon className="stroke-current" size="sm" />
          <span className="sr-only">Reset</span>
        </Button>
        <CollapsibleTrigger asChild>
          <Button aria-label="Open Section" className="aspect-square p-1" size="sm" variant="ghost">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default FilterSection;

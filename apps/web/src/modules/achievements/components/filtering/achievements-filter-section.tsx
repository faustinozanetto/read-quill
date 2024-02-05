import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DeleteIcon,
} from '@read-quill/design-system';
import React, { useState } from 'react';
import type { UseFilterActionsReturn } from '@modules/common/hooks/use-filter-actions';

interface AchievementsFilterSectionProps {
  title: string;
  children: React.ReactNode;
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const AchievementsFilterSection: React.FC<AchievementsFilterSectionProps> = (props) => {
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
          <DeleteIcon className="stroke-current" size="sm" />
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

export default AchievementsFilterSection;

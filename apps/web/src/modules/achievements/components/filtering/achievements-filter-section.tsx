import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@read-quill/design-system';
import React, { useState } from 'react';

interface AchievementsFilterSectionProps {
  title: string;
  children: React.JSX.Element;
}

const AchievementsFilterSection: React.FC<AchievementsFilterSectionProps> = (props) => {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible className="space-y-2" onOpenChange={setIsOpen} open={isOpen}>
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-semibold">{title}</h4>
        <CollapsibleTrigger asChild>
          <Button aria-label="Open Section" size="sm" variant="ghost">
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

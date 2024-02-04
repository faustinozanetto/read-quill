import React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  buttonVariants,
  SortAscIcon,
} from '@read-quill/design-system';

interface AchievementsFeedProps {
  children: React.JSX.Element;
  onRenderFilters: () => React.JSX.Element;
}

const AchievementsFeed: React.FC<AchievementsFeedProps> = (props) => {
  const { children, onRenderFilters } = props;

  return (
    <div className="flex flex-col gap-2">
      <Sheet>
        <SheetTrigger className={buttonVariants({ className: 'flex lg:hidden ml-auto' })}>
          <SortAscIcon className="mr-2" /> Filters & Sort
        </SheetTrigger>
        <SheetContent className="w-[300px] flex flex-col">
          <SheetHeader className="mb-2">
            <SheetTitle>Filtering & Sorting</SheetTitle>
          </SheetHeader>
          {onRenderFilters()}
        </SheetContent>
      </Sheet>

      <div className="flex gap-4">
        <div className="hidden lg:block w-[200px]">{onRenderFilters()}</div>
        {children}
      </div>
    </div>
  );
};

export default AchievementsFeed;

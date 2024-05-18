import React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  buttonVariants,
  SortAscIcon,
  cn,
} from '@read-quill/design-system';

/**
 * Props for the FiltersShell component.
 */
interface FiltersShellProps {
  /** Content to be rendered as children of the FiltersShell component. */
  children: React.ReactNode;
  filtersContainerClassNames?: string;
  /** Function to render the filters. */
  onRenderFilters: () => React.ReactNode;
}

const FiltersShell: React.FC<FiltersShellProps> = (props) => {
  const { children, filtersContainerClassNames, onRenderFilters } = props;

  return (
    <div className="flex flex-col relative">
      <Sheet>
        <SheetTrigger className={buttonVariants({ className: 'flex lg:hidden ml-auto mt-4 mr-4' })}>
          <SortAscIcon className="mr-2" /> Filters & Sort
        </SheetTrigger>
        <SheetContent className="w-[300px] flex flex-col">
          <SheetHeader className="mb-2">
            <SheetTitle>Filtering & Sorting</SheetTitle>
          </SheetHeader>
          {onRenderFilters()}
        </SheetContent>
      </Sheet>

      <div className="flex sticky top-0">
        <div className={cn('hidden relative lg:block w-[240px] p-4 border-r', filtersContainerClassNames)}>
          {onRenderFilters()}
        </div>
        {children}
      </div>
    </div>
  );
};

export default FiltersShell;

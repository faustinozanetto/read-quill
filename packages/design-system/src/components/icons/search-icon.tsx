import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type SearchIconProps = BaseIconProps;

const SearchIcon = forwardRef<SVGSVGElement, SearchIconProps>(({ className, size, ...props }, ref) => {
  return (
    <svg
      className={cn(iconVariants({ size }), 'stroke-current', className)}
      fill="none"
      ref={ref}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <circle cx="10" cy="10" r="7" />
      <line x1="21" x2="15" y1="21" y2="15" />
    </svg>
  );
});

SearchIcon.displayName = 'SearchIcon';

export { SearchIcon };
